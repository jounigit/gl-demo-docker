import express from 'express'
import 'express-async-errors'
import cors from 'cors'
import routes from './routes'
import middleware from './utils/middleware'

const app = express()

app.use(cors())
app.use(express.json())

app.get('/health', (req, res) => {
  res.send('ok')
})

app.get('/protected', middleware.authenticateToken, (req, res) => {
  res.json({ message: 'Welcome to the protected route!', user: req.user })
})

// Register API routes
app.use('/api', routes)

app.use(middleware.unknownEndpoint)
app.use(middleware.errorHandler)

export default  app