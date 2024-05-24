import { Request, Response } from 'express'
import fsPromise from 'fs/promises'
import { existsSync } from 'fs'
import Path from 'path'
import { deleteFileIfExists, imageValidations, makeSourcePath, resizeImage } from './helper'
import config from '../utils/config'
import { User } from '@prisma/client'
import { prisma } from '../services/prisma'

const IMAGES = config.IMAGES
const THUMBS = config.THUMBS

async function ensureDir(path: string) {
  await fsPromise.mkdir(path, { recursive: true })
}

// ********************************************************************
export const pictureUpload = async (req:Request, res:Response) => {
  if( !req.user || req.file === undefined ) {
    return res.status(400).send('No file sent or user not logged in')
  }
  const uploadedFile = req.file.path
  const user = req.user as Partial<User>
  const imgBuffer = await fsPromise.readFile(req.file.path)
  const ext = Path.extname(req.file.originalname).toLowerCase()
  const newName = Date.now() + ext
  const imgPath = makeSourcePath(IMAGES, newName)
  const thumbPath = makeSourcePath(THUMBS, newName)

  imageValidations(ext, req.file.size, res)

  await resizeAll(imgBuffer, uploadedFile, imgPath, thumbPath)

  const images = [imgPath, thumbPath]
  const getExistingFiles = checkFilesExistence(images)
  const isAllFilesDone = await isAllFiles(images)

  if (!isAllFilesDone) {
    removeUselessFiles(getExistingFiles)
    throw new Error('Could not process all files')
  }

  try {
    const result = await prisma.picture.create({
      data : {
        title: newName,
        image: newName,
        userID: user.id!
      }
    })
    res.status(200).send(result)
  } catch (error) {
    console.log(`Error while uploading the picture: ${error}`)
    removeUselessFiles(getExistingFiles)
    res.status(500).end()
  }


  const picture = await prisma.picture.findFirst({ where: { image: newName } })
  return res.json(picture)
  // const isAllFilesDone = await resizeAll(imgBuffer, uploadedFile, imgPath, thumbPath, newName, user)
  //   .then(() => isAllFiles(images))


  // handleFileUpload(newName, getExistingFiles, isAllFilesDone, res)
}

// ********************************************************************
function removeUselessFiles(getExistingFiles: string[]) {
  for (const file of getExistingFiles) {
    deleteFileIfExists(file)
  }
}

async function resizeAll(
  imgBuffer: Buffer,
  uploadedFile: string,
  imgPath: string,
  thumbPath: string,
  // newName: string,
  // user: Partial<User>
): Promise<void> {
  await ensureDir(THUMBS)
    .then(() => resizeImage(imgBuffer, uploadedFile, 600, imgPath))
    .then(() => resizeImage(imgBuffer, uploadedFile, 200, thumbPath))
    .then(() => deleteFileIfExists(uploadedFile))
}

// const handleFileUpload = async (newName: string, getExistingFiles: string[], isAllFilesDone: boolean, res: Response) => {
//   const existingFiles = checkFilesExistence(getExistingFiles)
//   const picture = await prisma.picture.findFirst({ where: { image: newName } })

//   if (!isAllFilesDone) {
//     for (const file of existingFiles) {
//       deleteFileIfExists(file)
//     }

//     picture && await deletePicture(picture)
//     return res.status(500).json({ msg: 'Server error' })
//   }

//   return res.json(picture)
// }

// const deletePicture = async (picture: Picture) => {
//   if (picture) {
//     await prisma.picture.delete({ where: { id: picture.id } })
//   }
// }

function checkFileExists(file: string): boolean {
  return existsSync(file)
}

const isAllFiles = (files: string[]): boolean => {
  return files.every(checkFileExists)
}

const checkFilesExistence = (files: string[]): string[] => {
  return files.filter((file) => existsSync(file))
}

