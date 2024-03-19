import * as dotenv from  'dotenv'

dotenv.config()

const PORT = process.env.PORT || 3001
const IMAGES = process.env.IMAGES_FOLDER || './images'
const THUMBS = process.env.THUMBS_FOLDER || '.images/thumbs'
const JWT_SECRET = process.env.JWT_SECRET
const JWT_REFRESH_SECRET =  process.env.JWT_REFRESH_SECRET
const REDIS_URL  = process.env.REDIS_URL  || 'redis://localhost:6379'
const DATABASE_URL = process.env.DATABASE_URL

export default {
  IMAGES,
  THUMBS,
  PORT,
  JWT_SECRET,
  JWT_REFRESH_SECRET,
  REDIS_URL,
  DATABASE_URL
}