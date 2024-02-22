import express from 'express'
import { PrismaClient } from '@prisma/client'
import cors from 'cors'
import routes from './routes'
import config from './utils/config'
import middleware from './utils/middleware'
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

  app.use(middleware.unknownEndpoint)
  app.use(middleware.errorHandler)

  // Catch unregistered routes
  // app.all('*', (req: Request, res: Response) => {
  //   res.status(404).json({ error: `Route ${req.originalUrl} not found` })
  // })

  // app.use(function (err:  Error, req: Request, res: Response, next: NextFunction): void {
  //   if (err.name === 'UnauthorizedError') {
  //     res.status(401).send('invalid token...')
  //   } else {
  //     next(err)
  //   }
  // })

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