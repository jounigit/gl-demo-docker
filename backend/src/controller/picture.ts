import type { Request, Response } from 'express'
import { prisma } from '../services/prisma'
import {
  createPicture,
  deletePicture,
  getPictureOrThrowError,
  getPictures
} from '../model/picture.model'
import type { UploadedFile } from 'express-fileupload'
import { onlyResizeImage } from '../model/helper'
import fs from 'node:fs/promises'
import { deleteImage, uploadImage } from '../services/imageService'
import type { Picture } from '@prisma/client'

// Returns an picture or throws an error

//**************** Get all pictures */
export const getAll = async (req: Request, res: Response) => {
  const pictures = await getPictures()
  return res.status(200).json(pictures)
}

// ********************** Get picture  by ID *************************** //
export const getOne = async (req: Request, res: Response) => {
  const id = Number.parseInt(req.params.id as string)

  // Check if the album exists in the database
  const picture = await getPictureOrThrowError(id)

  return res.status(200).json(picture)
}

// ********************** Upload picture *************************** //

interface pictureUploadResult extends Picture {
  name: string
}
export const upload = async (req: Request, res: Response) => {
  try {
    const file = req.files?.image as UploadedFile
    if (!file || !req.user || !req.user.id ) throw new Error('No file sent or user not logged in')

    const fileName = file.name
    const folder = '/gl-demo'
    const imgBuffer = await fs.readFile(file.tempFilePath)
    const imgPath = file.tempFilePath

    console.log({ fileName })
    console.log({ imgBuffer })
    const resizedImg = await onlyResizeImage(imgBuffer, imgPath, 800)
    if (resizedImg) {
      const result = await uploadImage(resizedImg, fileName, folder)
      if (result) {
        const { fileId, name, url, thumbnailUrl } = result as Partial<pictureUploadResult>
        if (!fileId || !name || !url || !thumbnailUrl ) throw new Error('Upload error')

        const newPic = await createNew( name, fileId, url, thumbnailUrl, req.user.id )
        console.log({ newPic })
        res.status(200).json({ success: true, data: newPic })
      }
    }

  } catch (error) {
    res.status(500).json({ success: false, message: error })
  }
}

export const createNew = async (title: string, fileId: string, url: string, thumbnailUrl: string, userID: number) => {

  const data = {
    title,
    fileId,
    url,
    thumbnailUrl,
    userID: userID
  }
  const picture = await createPicture(data)

  if (!picture) throw new Error('Could not add the picture')

  return picture
}
// ****************** Create a new picture  ***********************
export const create = async (req: Request, res: Response) => {
  const { title, year, content, fileId, url, thumbnailUrl, userID } = req.body
  if (!fileId || url || thumbnailUrl || !title || !userID) throw new Error( 'Missing data' )

  const data = {
    title,
    year,
    content,
    fileId,
    url,
    thumbnailUrl,
    userID: Number.parseInt(userID as string)
  }
  const picture = await createPicture(data)

  if (!picture) throw new Error('Could not add the picture')

  return res.status(201).json({ data: picture, message: 'Picture created!' })
}

// ***************** Update picture *******************************
export const update = async (req: Request, res: Response) => {
  const id = Number.parseInt(req.params.id as string)

  if (!Object.keys(req.body).length) throw new Error('Nothing to update.' )

  // Check if the album exists in the database
  await getPictureOrThrowError(id)

  const picture = await prisma.picture.update({
    where: { id },
    data:{ ...req.body },
  })

  if (!picture) throw new Error('Could not update the picture')

  return res.status(200).json(picture)
}

// ********* Delete a specific picture by its ID **********************
export const remove = async (req: Request, res: Response) => {
  const id = Number.parseInt(req.params.id as string)

  const picture = await deletePicture(id)

  // const bigPicture = makeSourcePath(config.IMAGES, picture.image)
  // const smallPicture = makeSourcePath(config.THUMBS, picture.image)

  // deleteFileIfExists(bigPicture)
  // deleteFileIfExists(smallPicture)
  deleteImage(picture.fileId)

  return res.status(200).json({ message: 'Picture deleted successfully' })
}

// export const upload = async (req: Request, res: Response) => {
//   if (!req.user || req.file === undefined) {
//     return res.status(400).send('No file sent or user not logged in')
//   }

//   try {
//     console.log({ req })
//     const result = await pictureUploadModel(req.file, req.user)
//     res.status(200).send(result)
//   } catch (error) {
//     res.status(500).json({ msg: 'Server error' })
//   }
// }


// export const upload0 = async (req: Request, res: Response) => {
//   // if (!req.user) return res.status(400).send('No user logged in')
//   if (!req.files) return res.status(400).send('No file sent')
//   // const { image: Uploaded } = req.files
//   const uploadedImg = req.files.image as UploadedFile
//   const imgPat = uploadedImg.tempFilePath
//   const ext = uploadedImg.mimetype
//   console.log({ ext })
//   const imgBuffer = await fs.readFile(imgPat)
//   console.log({ imgBuffer })
//   const resizedImg = await onlyResizeImage(imgBuffer, imgPat, 800)
//   console.log({ resizedImg })
// }