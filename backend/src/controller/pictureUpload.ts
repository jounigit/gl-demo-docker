import { Request, Response } from 'express'
import fsPromise from  'fs/promises'
import fs, { PathLike } from  'fs'
import Path from  'path'
import { deleteFile, resizeImage, validations } from './helper'
import config from '../utils/config'
import { prisma } from '../app'

const IMAGES = config.IMAGES
const THUMBS = config.THUMBS

async function ensureDir(path: string) {
  await fsPromise.mkdir(path, { recursive: true })
}

export const pictureUpload =  async (req:Request, res:Response) => {
  if( req.file === undefined ) return res.status(400).send('No file sent')
  const uploadedFile = req.file.path
  const imgBuffer =  await fsPromise.readFile(req.file.path)
  const ext = Path.extname(req.file.originalname).toLowerCase()
  const newName =  Date.now() + ext
  const imgSrc  = `${IMAGES}/${newName}`
  const thumb = `${THUMBS}/${newName}`

  validations(ext, req.file.size, res)

  async function resizeAll() {
    await ensureDir(THUMBS)
      .then(() => resizeImage(imgBuffer, uploadedFile, 600, imgSrc))
      .then(() => resizeImage(imgBuffer, uploadedFile, 200, thumb))
      .then(() => deleteFile(uploadedFile))
      .then(async () => {
        await prisma.picture.create({
          data : {
            title: req.file?.originalname  || newName,
            image: newName,
            userID: 1
          }
        })
      })
  }

  resizeAll()
    .then(() => {
      testFiles(imgSrc)
      testFiles(thumb)
    })

  testFiles(thumb)
  return res.json('File Uploaded Successfully!')
}

function testFiles(src: PathLike) {
  if (fs.existsSync(src)  ) {
    console.log(`${src} exists.`)
  } else {
    console.error(`${src} does not exist.`)
  }
}

// function testFiles(params:type) {
//     if (fs.existsSync(imgSrc)  ) {
//         res.json({image: newName})
//     } else {
//         res.status(500).send('Server error')
//     }
// }


// .then(async () => {
//     await prisma.picture.create({
//         data : {
//             title: req.file?.originalname  || newName,
//             image: newName
//         }
//     })
// })
