import express from 'express'
import 'express-async-errors'
import cors from 'cors'
import routes from './routes'
import middleware from './utils/middleware'
import config from './utils/config'

const app = express()

app.use(cors())
app.use(express.json())

app.get('/health', (req, res) => {
  console.log(config.DATABASE_URL)
  console.log(config.NODE_ENV)
  res.send('ok health')
})

app.get('/protected', middleware.authenticateToken, (req, res) => {
  res.json({ message: 'Welcome to the protected route!', user: req.user })
})

// Register API routes
app.use('/api', routes)

app.use(middleware.unknownEndpoint)
app.use(middleware.errorHandler)

export default  app