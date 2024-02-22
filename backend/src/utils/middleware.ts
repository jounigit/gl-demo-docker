import { PrismaClientKnownRequestError, PrismaClientValidationError } from '@prisma/client/runtime/library'
import { NextFunction, Request, Response } from 'express'


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
    res.status(400).json({ error: 'invalid request, check your server logs for more info' })
  }
  if ( err instanceof PrismaClientValidationError) {
    res.status(500).json({ error: 'an unknown error occured, check your server logs for more info' })
  }

  next(err)
}

export default {
  unknownEndpoint,
  errorHandler
}