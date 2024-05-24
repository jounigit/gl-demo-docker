import fs from 'fs/promises'
import path from 'path'
import sharp from 'sharp'
import {
  makeSourcePath, isAllFiles, checkFilesExistence,
  deleteFileIfExists,
  ensureDir

} from './helper'
import { User } from '@prisma/client'
import { createPicture } from './picture.model'

export async function upload(file: Express.Multer.File, user: Partial<User>) {
  const uploadedFile = file.path
  const imgBuffer = await fs.readFile(uploadedFile)
  const ext = path.extname(file.originalname).toLowerCase()
  const newName = Date.now() + ext
  const imgPath = makeSourcePath('IMAGES', newName)
  const thumbPath = makeSourcePath('THUMBS', newName)

  const validationResult = imageValidations(ext, file.size)
  if (!validationResult) {
    throw new Error(`Image validation failed: ${validationResult}`)
  }

  await resizeAll(imgBuffer, uploadedFile, imgPath, thumbPath)

  const images = [imgPath, thumbPath]
  const getExistingFiles = checkFilesExistence(images)
  const isAllFilesDone = await isAllFiles(images)

  if (!isAllFilesDone) {
    for (const file of getExistingFiles) {
      deleteFileIfExists(file)
    }
    throw new Error('Could not process all files')
  }

  const data = {
    title: file.originalname || newName,
    image: newName,
    userID: user.id!
  }

  return await createPicture(data)
}

async function resizeAll(imgBuffer: Buffer, uploadedFile: string, imgPath: string, thumbPath: string) {
  await ensureDir('THUMBS')
    .then(() => sharp(imgBuffer)
      .resize(600)
      .toFile(imgPath))
    .then(() => sharp(imgBuffer)
      .resize(200)
      .toFile(thumbPath))
    .then(() => deleteFileIfExists(uploadedFile))
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
