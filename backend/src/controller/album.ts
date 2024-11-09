import type { Request, Response } from 'express'
import { prisma } from '../services/prisma'
import { BadRequestError } from '../helpers/api-errors'
import {
  type INewAlbum,
  createAlbum,
  deleteAlbum,
  updateAlbum,
} from '../model/album.model'

// Returns an album or throws an error
export async function getAlbumOrThrowError(id: number) {
  const album = await prisma.album.findUnique({
    where: { id },
    include: {
      pictures: {
        include: {
          picture: true,
        },
      },
    },
  })
  if (!album) throw new BadRequestError('Invalid id')
  return album
}

// ****************** Get all  **********************************
export const getAll = async (req: Request, res: Response) => {
  const result = await prisma.album.findMany({
    include: {
      pictures: { include: { picture: true } },
    },
  })
  /** Takes only pictures-property. */
  const albums = result.map((a) => {
    return { ...a, pictures: a.pictures.map((pic) => pic.picture) }
  })
  return res.status(200).json(albums)
}

// ****************** Get one  **********************************
export const getOne = async (req: Request, res: Response) => {
  const id = Number.parseInt(req.params.id as string)
  const result = await getAlbumOrThrowError(id)
  /** Takes only pictures-property. */
  const album = {
    ...result,
    pictures: result.pictures.map((pic) => pic.picture),
  }
  return res.status(200).json(album)
}

// ****************** Get by slug  **********************************
export const getBySlug = async (req: Request, res: Response) => {
  const slug = req.params.slug as string
  const result = await prisma.album.findFirst({ where: { slug } }, )
  if (!result) throw new BadRequestError('Invalid slug')
  const album = await getAlbumOrThrowError(result.id)

  /** Takes only pictures-property. */
  const albumWithPics = {
    ...album,
    pictures: album.pictures.map((pic) => pic.picture),
  }
  return res.status(200).json(albumWithPics)
}

// ****************** Create ************************************
export const create = async (req: Request, res: Response) => {
  if (!req.body.title || !req.user)
    throw new Error('Missing data or authentication')

  const data = { userID: req.user.id, ...req.body }

  const created = await createAlbum(data)

  return res.status(201).json(created)
}

// ***************** Update *******************************
export const update = async (req: Request, res: Response) => {
  const id = Number.parseInt(req.params.id as string)
  const body = req.body as INewAlbum

  if (!Object.keys(body).length) throw new Error('Nothing to update.')

  // Check if the album exists in the database
  await getAlbumOrThrowError(id)

  const updatedAlbum = await updateAlbum(id, body)

  return res.status(200).json(updatedAlbum)
}

// ********* Delete a specific picture by its ID **********************
export const remove = async (req: Request, res: Response) => {
  const id = Number.parseInt(req.params.id as string)

  await getAlbumOrThrowError(id)

  await deleteAlbum(id)

  return res.status(200).send('The album has been deleted.')
}
