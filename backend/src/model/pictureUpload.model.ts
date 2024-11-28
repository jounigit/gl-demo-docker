import fsPromise from 'node:fs/promises'
import { existsSync } from 'node:fs'
import Path from 'node:path'
import { deleteFileIfExists, makeSourcePath, resizeImage } from './helper'
import config from '../utils/config'
import type { Picture, User } from '@prisma/client'
import { prisma } from '../services/prisma'

const IMAGES = config.IMAGES
const THUMBS = config.THUMBS

async function ensureDir(path: string) {
  await fsPromise.mkdir(path, { recursive: true })
}


export async function pictureUploadModel(file: Express.Multer.File, user: Partial<User>): Promise<Picture> {
  const uploadedFile = file.path
  const imgBuffer = await fsPromise.readFile(uploadedFile)
  const ext = Path.extname(file.originalname).toLowerCase()
  const newName = Date.now() + ext
  const imgPath = makeSourcePath(IMAGES, newName)
  const thumbPath = makeSourcePath(THUMBS, newName)

  console.log({ uploadedFile })

  const validationResult = imageValidations(ext, file.size)
  if (!validationResult) {
    throw new Error(`Image validation failed: ${validationResult}`)
  }

  await resizeAll(imgBuffer, uploadedFile, imgPath, thumbPath)

  const images = [imgPath, thumbPath]
  const getExistingFiles = checkFilesExistence(images)
  const isAllFilesDone = await isAllFiles(images)

  if (!isAllFilesDone) {
    removeUselessFiles(getExistingFiles)
    throw new Error('Could not process all files')
  }

  const createdPic = await prisma.picture.create({
    data : {
      title: newName,
      image: newName,
      // biome-ignore lint/style/noNonNullAssertion: <explanation>
      userID: user.id!
    }
  })

  if (createdPic.image === undefined || createdPic.title === undefined) {
    throw new Error('DB error on saving picture info')
  }

  return createdPic
}

// ******************************************************************************
// HELPER FUNCTIONS BELOW
// ******************************************************************************
async function resizeAll(
  imgBuffer: Buffer,
  uploadedFile: string,
  imgPath: string,
  thumbPath: string
): Promise<void> {
  await ensureDir(THUMBS)
    .then(() => resizeImage(imgBuffer, uploadedFile, 600, imgPath))
    .then(() => resizeImage(imgBuffer, uploadedFile, 200, thumbPath))
    .then(() => deleteFileIfExists(uploadedFile))
}

function removeUselessFiles(getExistingFiles: string[]) {
  for (const file of getExistingFiles) {
    deleteFileIfExists(file)
  }
}

function checkFileExists(file: string): boolean {
  return existsSync(file)
}

const isAllFiles = (files: string[]): boolean => {
  return files.every(checkFileExists)
}

const checkFilesExistence = (files: string[]): string[] => {
  return files.filter((file) => existsSync(file))
}

function imageValidations(ext: string, size: number) {
  if( ['.jpg','.jpeg','.png'].indexOf(ext) === -1 ) {
    return 'Invalid file type!'
  }

  const maxSize: number = 2
  if( size > maxSize*1024*1024){
    return `File too large! Maximum file size is ${maxSize}mb.`
  }

  return true
}
