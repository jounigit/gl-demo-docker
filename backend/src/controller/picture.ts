import { Request, Response } from 'express'
import { deleteFileIfExists, makeSourcePath } from './helper'
import config from '../utils/config'
import { prisma } from '../services/prisma'
import { deletePicture, getPictureOrThrowError, getPictures } from '@/model/picture.model'

// Returns an picture or throws an error

//**************** Get all pictures */
export const getAll = async (req: Request, res: Response) => {
  const pictures = await getPictures()
  return res.status(200).json(pictures)
}

// ********************** Get picture  by ID *************************** //
export const getOne = async (req: Request, res: Response) => {
  const id = parseInt(req.params.id as string)

  // Check if the album exists in the database
  const picture = await getPictureOrThrowError(id)

  return res.status(200).json({ data: picture })
}

// ****************** Create a new picture  ***********************
export const create = async (req: Request, res: Response) => {
  const { title, year, content, image, userID } = req.body
  if (!image  || !title  || !userID) throw new Error( 'Missing data' )

  const picture = await prisma.picture.create({
    data: {
      title,
      year,
      content,
      image,
      userID: parseInt(userID as string)
    },
  })

  if  (!picture) throw new Error('Could not add the picture')

  return res.status(201).json({ data: picture, message: 'Picture created!' })
}

// ***************** Update picture *******************************
export const update = async (req: Request, res: Response) => {
  const id = parseInt(req.params.id as string)

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
  const id = parseInt(req.params.id as string)

  const picture = await deletePicture(id)

  const bigPicture = makeSourcePath(config.IMAGES, picture.image)
  const smallPicture = makeSourcePath(config.THUMBS, picture.image)

  deleteFileIfExists(bigPicture)
  deleteFileIfExists(smallPicture)

  return res.status(200).json({ message: 'Picture deleted successfully' })
}