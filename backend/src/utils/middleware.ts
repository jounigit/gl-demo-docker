import { PrismaClientKnownRequestError, PrismaClientValidationError } from '@prisma/client/runtime/library'
import { NextFunction, Request, Response } from 'express'
import { getUserFromHeader } from '../controller/userFromHeader'
import { UnauthorizedError } from '../helpers/api-errors'

const unknownEndpoint = (req: Request, res: Response) => {
  res.status(404).json({ error: `Route ${req.originalUrl} not found` })
}

const errorHandler = (err: Error, _: Request, res: Response, next: NextFunction)  => {

  if (err.name === 'JsonWebTokenError') {
    res.status(401).json({ error: 'invalid token' })
  }
  if (err.name === 'UnauthorizedError') {
    res.status(401).json({ error: 'unauthorized' })
  }

  if (err instanceof PrismaClientKnownRequestError) {
    // res.status(400).json({ error: 'invalid request, check your server logs for more info' })
    res.status(400).json({ error: err.message  || 'Invalid request.' })
  }
  if ( err instanceof PrismaClientValidationError) {
    res.status(500).json({ error: 'an unknown error occured, check your server logs for more info' })
  }

  res.json({ error: err.message })
  next(err)
}

// if (error.name === 'CastError') {
//   return response.status(400).send({ error: 'malformatted id' })
// }
// if (error.name === 'ValidationError') {
//   return response.status(400).json({ error: error.message })
// }

function authenticateToken(req: Request, res: Response, next: NextFunction) {
  const authHeader = req.headers['authorization']
  const token = authHeader && authHeader.split(' ')[1]

  if (!token) {
    // return res.status(401).json({ error:'Not authorized' })
    throw new UnauthorizedError()
  }
  const user = getUserFromHeader(authHeader)
  console.log(user)
  if(!user) return res.status(400).json({ error: 'Not authorized' })
  if(user){
    req.user = user
  }
  next()
}

export default {
  unknownEndpoint,
  errorHandler,
  authenticateToken
}