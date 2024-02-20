import express, { Request, Response } from 'express'
import { PrismaClient } from '@prisma/client'
import cors from 'cors'
import routes from './routes'
import config from './utils/config'
// import UserRouter from "./routes/user";

export const prisma = new PrismaClient()

const app = express()

async function main() {
  app.use(cors())
  app.use(express.json())

  app.get('/health', (req, res) => {
    res.send('ok')
  })

  // Register API routes
  app.use('/api', routes)

  // Catch unregistered routes
  app.all('*', (req: Request, res: Response) => {
    res.status(404).json({ error: `Route ${req.originalUrl} not found` })
  })

  app.listen(config.PORT, () => {
    console.log(`Server is listening on port ${config.PORT}`)
  })
}

main()
  .then(async () => {
    await prisma.$connect()
  })
  .catch(async (e) => {
    console.error(e)
    await prisma.$disconnect()
    process.exit(1)
  })