import { pictureUploadModel } from '../model/pictureUpload.model'
import { Request, Response } from 'express'

export const pictureUploadC = async (req: Request, res: Response) => {
  if (!req.user || req.file === undefined) {
    return res.status(400).send('No file sent or user not logged in')
  }

  try {
    const result = await pictureUploadModel(req.file, req.user)
    res.status(200).send(result)
  } catch (error) {
    res.status(500).json({ msg: 'Server error' })
  }
}
