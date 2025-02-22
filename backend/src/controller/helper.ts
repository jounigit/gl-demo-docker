/* eslint-disable @typescript-eslint/no-var-requires */
import { Response } from 'express'
import util from  'util'
import sharp from 'sharp'
import { existsSync, unlinkSync } from 'fs'
// import fsPromise from  'fs/promises'
const sizeOf = util.promisify(require('image-size'))

export function imageValidations(ext: string, fileSize: number, res: Response) {
  if( ['.jpg','.jpeg','.png'].indexOf(ext) === -1 ) {
    return res.send({ error: 'Invalid file type!' })
  }
  // Allowed file size in mb
  const maxSize: number = 2
  if( fileSize > maxSize*1024*1024){
    return res.status(400).send({ error: `File too large! Maximum file size is ${maxSize}mb.` })
  }
}

export function makeSourcePath(dir: string, newName: string) {
  return `${dir}/${newName}`
}

export const deleteFileIfExists = (filePath: string) => {
  if (existsSync(filePath)) {
    unlinkSync(filePath)
  }
}

export async function resizeImage(buf: Buffer, srcUrl: string, size: number, destUrl: string) {
  const options = await getOptionsByOrientation(srcUrl, size)

  try {
    await sharp(buf)
      .resize(options)
      .toFile(destUrl)

  } catch (error) {
    console.log(error)
  }
}

async function getOptionsByOrientation(file: string, size: number) {
  const orientation =  await getOrientation(file)
  return getOptions(orientation, size)
}

async function getOrientation (file: string): Promise<string> {
  try {
    const dimensions = await sizeOf(file)
    console.log('Dimensions: ', dimensions)
    return dimensions.width < dimensions.height ? 'isPortrait' : 'isLandscape'
  } catch (err) {
    console.error(err)
    return 'square'
  }
}

function getOptions(orientation: string, size: number): object {
  let options
  if (orientation === 'isPortrait') {
    options = {
      width: undefined,
      height: size
    }
  } else {
    options = {
      width: size,
      height: undefined
    }
  }
  return options
}
