import { prisma } from '../services/prisma'
import type { Request, Response } from 'express'

// ***************** Get all *********************************
export async function getAll(req: Request, res: Response) {
  try {
    const albumPics = await prisma.albumsOnPictures.findMany()
    res.json(albumPics)
  } catch (error) {
    res.status(500).json({ message: 'Error fetching album pictures' })
  }
}

// ****************** Create ************************************
export const createAlbumsOnPictures = async (req: Request, res: Response) => {
  const { albumId, pictureId } = req.body

  await prisma.albumsOnPictures.create({
    data: {
      albumId: Number.parseInt(String(albumId)),
      pictureId: Number.parseInt(String(pictureId))
    },
  }).then((data) => {
    if (!data) {
      res.status(404).send({ error: 'Could not add the picture to the album.' })
    } else {
      res.json(data)
    }
  }).catch((e) => {
    console.log(e)
    res.status(500).send()
  })
}

// ********* Delete  **********************
export const removeAlbumFromPicture = async (req: Request, res: Response) => {
  const { albumId, pictureId } = req.body

  try{
    const record = await prisma.albumsOnPictures.delete({
      where : {
        albumId_pictureId: {
          albumId: Number.parseInt(String(albumId)),
          pictureId: Number.parseInt(String(pictureId))
        }
      }
    })

    if(!record){
      return res.status(404).send('The entry was not found')
    // biome-ignore lint/style/noUselessElse: <explanation>
    }else{
      res.json({ message: 'Album picture deleted successfully' })
    }
  } catch(e){
    res.status(500).send('Internal Error')
  }
}
