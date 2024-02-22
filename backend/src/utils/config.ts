import * as dotenv from  'dotenv'

dotenv.config()

const PORT = process.env.PORT || 8080
const IMAGES = process.env.IMAGES_FOLDER || './images'
const THUMBS = process.env.THUMBS_FOLDER || '.images/thumbs'
const JWT_SECRET = process.env.JWT_SECRET

export default {
  IMAGES,
  THUMBS,
  PORT,
  JWT_SECRET
}