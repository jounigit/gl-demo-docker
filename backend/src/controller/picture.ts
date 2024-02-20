import { Request, Response } from 'express'
import { prisma } from '../app'

// Get all pictures
export const getAll = async (req: Request, res: Response) => {
  try {
    const pictures = await prisma.picture.findMany()
    return res.status(200).json(pictures)
  } catch (error) {
    console.log('Error getting pictures', error)
    return res.status(500).json({ message: 'Server Error' })
  }
}

// Get picture
export const getOne = async (req: Request, res: Response) => {
  const id = req.params.id
  if (!id) {
    return res.status(400).json({ message: 'Missing ID parameter' })
  }

  try {
    const picture = await prisma.picture.findUnique({ where: { id: parseInt(id) } })
    if (!picture) {
      return res.status(404).json({ message: 'No picture found with that ID' })
    }
    return res.status(200).json({ data: picture })
  } catch (error) {
    console.log(`Error getting picture ${id}`, error)
    return res.status(500).json({ message: `Failed to get picture ${id}` })
  }
}

// Create a new picture
export const createPicture = async (req: Request, res: Response) => {
  const { title, year, content, image, userID } = req.body
  if (!image  || !title) {
    return res.status(400).json({ message: 'Missing data' })
  }

  const picture = await prisma.picture.create({
    data: {
      title,
      year,
      content,
      image,
      userID: parseInt(userID as string)
    },
  })

  return res.status(201).json({ data: picture, message: 'Picture created!' })
}

// Update picture
export  const updatePicture = async (req: Request, res: Response) => {
  const id = parseInt(req.params.id as string)

  if (!Object.keys(req.body).length) return res.status(400).json({ message: 'Nothing to update.' })

  const picture = await prisma.picture.findUnique({ where: { id } })

  if(!picture) return res.status(404).json({ message:'Could not find the picture.' })

  try {
    const picture = await prisma.picture.update({
      where: { id },
      data:{ ...req.body },
    })

    return res.status(200).json({ data:picture,message:'Successfully updated' })
  } catch (error) {
    console.log(error)
    return res.status(500).json({ message:'Server error' })
  }
}

// Delete a specific picture by its ID
export const deletePicture = async (req: Request, res: Response) => {
  const id = parseInt(req.params.id as string)

  const picture = await prisma.picture.delete({ where: { id } })

  if (!picture) {
    return res.status(404).json({ message: 'Picture not found' })
  }

  return res.status(200).json({ message: 'Picture deleted successfully' })
}