import { NextFunction, Request, Response } from 'express'
import { prisma } from '../app'
import { getUserFromHeader } from './userFromHeader'

// Get  all albums
export const getAll = async (req: Request, res: Response) => {
  const albums = await prisma.album.findMany({
    include: {
      pictures: { include: { picture: true } }
    }
  })
  return res.status(200).json(albums)
}

// Get album
export const getOne = async (req: Request, res: Response, next: NextFunction) => {
  try{
    const album = await prisma.album.findUnique({
      where: { id: parseInt(req.params.id) },
      include: {
        pictures: { include: { picture: true } }
      }
    })
    if(!album) return res.status(404).json({ error: 'User not found' })
    return res.status(200).json(album)
  } catch (e){
    console.log(e)
    next(e)
  }
}

// Create an album
export const createAlbum = async (req: Request, res: Response) => {
  const user = getUserFromHeader(req.headers['authorization']!)
  if (!req.body.title  || !user || !user.id) {
    return res.status(400).json({ error: 'Missing data or authentication' })
  }
  const { title, year, content } = req.body

  try{
    const newAlbum = await prisma.album.create({
      data:{
        title,
        slug: title.toLowerCase().replace(/[^a-zA-Z0-9]/g,'-'),
        year,
        content,
        userID: user.id
      },
    })

    return res.status(201).json(newAlbum)
  }catch(e){
    console.log(e)
    return res.status(500).json({ 'error': e })
  }
}

// Update an album
export const updateAlbum = async (req: Request, res: Response) => {
  const id = parseInt(req.params.id as string)
  const { title, year, content } = req.body

  // Check if the album exists in the database
  const album = await prisma.album.findUnique({ where: { id } })

  if(!album) return res.status(404).send('The album was not found.')

  // If fields are provided, update them in the database
  if (Object.keys(req.body).length > 0) {
    try{
      const updatedAlbum = await prisma.album.update({
        where: { id },
        data: {
          title: title ? title : album.title,
          slug: title.toLowerCase().replace(/[^a-zA-Z0-9]/g,'-'),
          year: isNaN(year) ? album.year : year,
          content: content ? content : album.content,
        }
      })

      return res.status(200).json(updatedAlbum)
    } catch(e) {
      return res.status(400).json({ 'error': e })
    }
  }
}

// Delete an album
export const deleteAlbum = async (req: Request, res: Response) => {
  const id = parseInt(req.params.id as string)

  const album = await prisma.album.delete({
    where: { id }
  })

  if (!album) return res.status(404).send('The album was not found.')

  return res.status(200).send('The album has been deleted.')
}

// const album = await prisma.album.findUnique({
//   where: { id: parseInt(req.params.id) },
//   select: {
//     id: true,
//     title: true,
//     content: true,
//     user: { select: { name:true } },
//     pictures: true
//   }
// })