import { Request, Response } from 'express'
import { prisma } from '../app'

export const createAlbumsOnPictures = async (req: Request, res: Response) => {
  const { albumId, pictureId } = req.body

  await prisma.albumsOnPictures.create({
    data: {
      albumId: parseInt(String(albumId)),
      pictureId: parseInt(String(pictureId))
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

export const removeAlbumFromPicture = async (req: Request, res: Response) => {
  const { albumId, pictureId } = req.body

  try{
    const record = await prisma.albumsOnPictures.delete({
      where : {
        albumId_pictureId: {
          albumId: parseInt(String(albumId)),
          pictureId: parseInt(String(pictureId))
        }
      }
    })

    if(!record){
      return res.status(404).send('The entry was not found')
    }else{
      res.json(record)
    }
  } catch(e){
    res.status(500).send('Internal Error')
  }
}
