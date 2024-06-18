import { prisma } from '../services/prisma'
import type { Album, Picture } from '@prisma/client'

export const getPictures = async (): Promise<Picture[]> => await prisma.picture.findMany()

export async function getPictureOrThrowError(id: number) {
  const picture = await prisma.picture.findUnique({ where: { id } })
  if (!picture) throw new Error( `No picture found with id ${id}`, )
  return picture
}

export interface INewPicture {
    title: string;
    year?: string;
    content?: string;
    image: string;
    userID: number
}

export const createPicture = async (data: INewPicture): Promise<Picture> => {
  const picture = await prisma.picture.create({ data })
  if (!picture) {throw new Error('Could not create the picture')}
  return picture
}

export const updatePicture = async (id: number, data: Partial<Album>) => {
  await getPictureOrThrowError(id)
  const updatedPicture = await prisma.picture.update({
    where: { id },
    data,
  })
  if (!updatedPicture) throw new Error(`Failed to update picture with ID "${id}"`)
  return updatedPicture
}

export const deletePicture = async (id: number) => {
  await getPictureOrThrowError(id)
  const res = await prisma.picture.delete({ where: { id } })
  if (!res) throw new Error(`Failed to delete picture with ID "${id}"`)
  return res
}