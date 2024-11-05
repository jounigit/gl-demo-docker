import express from 'express'
import 'express-async-errors'
import cors from 'cors'
import routes from './routes'
import middleware from './utils/middleware'
// import config from './utils/config'
import path from 'node:path'

const app = express()

app.use(cors())
app.use(express.json())

app.use('/images', express.static(path.join(__dirname, '../images')))
app.use('/thumbs', express.static(path.join(__dirname, '../images/thumbs')))

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

export default app