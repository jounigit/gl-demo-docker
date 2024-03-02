import express from 'express'
import { PrismaClient } from '@prisma/client'
import cors from 'cors'
import routes from './routes'
import config from './utils/config'
import middleware from './utils/middleware'
import { getFromCache, setToCache } from './services/redis'
// import UserRouter from "./routes/user";

export const prisma = new PrismaClient()

const app = express()

async function main() {
  app.use(cors())
  app.use(express.json())

  app.get('/health', (req, res) => {
    res.send('ok')
  })

  app.get('/see',  async (req:express.Request,res:express.Response) => {
    console.log('URL SEEE')
    try{
      // await redis.connect()
      // const pingCommandResult = await redis.ping()
      // console.log('Ping command result: ', pingCommandResult)
      // const data = await redis.get('users')
      await setToCache('test', 'ÄÄÄÄÄÄÄÄÄÄ')
      const data = await getFromCache('users')
      if(data!==null){
        console.log('data')
        // res.send(data)
        res.send({ payload:JSON.parse(data) })
      }
    }catch(e){
      console.error(e)
      res.send(e)
    }
  } )

  // Register API routes
  app.use('/api', routes)

  app.use(middleware.unknownEndpoint)
  app.use(middleware.errorHandler)

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