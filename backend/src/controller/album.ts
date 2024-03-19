import { Request, Response } from 'express'
import { prisma } from '../services/prisma'
import { BadRequestError } from '../helpers/api-errors'

// Returns an album or throws an error
export async function getAlbumOrThrowError(id: number) {
  const album = await prisma.album.findUnique({ where: { id } })
  if (!album) throw new BadRequestError('Invalid id')
  return album
}
// throw new BadRequestError( `No album found with id ${id}`, )
// ****************** Get all  **********************************
export const getAll = async (req: Request, res: Response) => {
  const albums = await prisma.album.findMany({
    include: {
      pictures: { include: { picture: true } }
    }
  })
  return res.status(200).json(albums)
}

// ****************** Get one  **********************************
export const getOne = async (req: Request, res: Response) => {
  const id = parseInt(req.params.id as string)

  const album = await getAlbumOrThrowError(id)

  return res.status(200).json(album)
}

// ****************** Create ************************************
export const createAlbum = async (req: Request, res: Response) => {
  if (!req.body.title || !req.user || !req.user.id) throw new Error( 'Missing data or authentication' )

  try{
    const newAlbum = await prisma.album.create({
      data:{ userID: req.user.id,  ...req.body },
      select: { id: true, title: true, createdAt: true, updatedAt: true }
    })

    return res.status(201).json(newAlbum)
  }catch(e){
    console.log('error', e)
    return res.status(500).json({ error: 'Could not create the album' })
  }
}

// ***************** Update *******************************
export const updateAlbum = async (req: Request, res: Response) => {
  const id = parseInt(req.params.id as string)

  if (!Object.keys(req.body).length) throw new Error('Nothing to update.' )

  // Check if the album exists in the database
  await getAlbumOrThrowError(id)

  const updatedAlbum = await prisma.album.update({
    where: { id },
    data: { ...req.body }
  })

  return res.status(200).json(updatedAlbum)
}

// ********* Delete a specific picture by its ID **********************
export const deleteAlbum = async (req: Request, res: Response) => {
  const id = parseInt(req.params.id as string)

  await getAlbumOrThrowError(id)

  await prisma.album.delete({
    where: { id }
  })

  return res.status(200).send('The album has been deleted.')
}

