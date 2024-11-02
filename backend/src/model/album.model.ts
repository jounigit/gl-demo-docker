import { prisma } from '../services/prisma'
import type { Album } from '@prisma/client'

export const getAlbums = async (): Promise<Album[]> => await prisma.album.findMany()

export const getAlbum = async (id: number): Promise<Album | null> => {
  if (!id) return null
  return await prisma.album.findUnique({ where: { id } })
}

export const getAlbumBySlug = async (slug: string): Promise<Album | null> => {
  // if (!slug) return null
  console.log('SLUG album model: ', slug)
  return await prisma.album.findFirst({ where:{ slug } })
}

export interface INewAlbum {
    title: string;
    year?: string;
    content?: string;
    userID: number
}

export const createAlbum = async (data: INewAlbum) => {
  const album = await prisma.album.create({ data })
  if (!album){throw new Error('Could not create the album')}
  return album
}

export const updateAlbum = async (id: number, data: Partial<Album>): Promise<Album> => {
  const res = await prisma.album.update({
    where:{ id },
    data
  })
  if(!res){ throw new Error('couldn\'t update album')}
  return res
}

export const deleteAlbum = async (id:number) => {
  const isDeleted = await prisma.album.delete({ where:{ id } })
  if(!isDeleted){throw new Error('Failed to delete album')}
  return isDeleted
}