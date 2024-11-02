/* eslint-disable @typescript-eslint/no-explicit-any */
import type { NextFunction, Request, Response } from 'express'
import jwt from 'jsonwebtoken'
import config from './utils/config'

export function notFound( req: Request, res: Response, next: NextFunction) {
  res.status(404)
  const error = new Error(`🔍 - Not Found - ${req.originalUrl}`)
  next(error)
}

export function errorHandler(err: Error, _: Request, res: Response) {
  /* eslint-enable no-unused-vars */
  const statusCode = res.statusCode !== 200 ? res.statusCode : 500
  res.status(statusCode)
  res.json({
    message: err.message,
    stack: process.env.NODE_ENV === 'production' ? '🥞' : err.stack
  })
}

export function isAuthenticated(_err: Error, req: Request, res: Response, next: NextFunction) {
  const { authorization } = req.headers

  if (!authorization) {
    res.status(401)
    throw new Error('🚫 Un-Authorized 🚫')
  }

  try {
    const token = authorization.split(' ')[1]
    // biome-ignore lint/style/noNonNullAssertion: <explanation>
    // biome-ignore lint/suspicious/noExplicitAny: <explanation>
    const payload = jwt.verify(token, config.JWT_SECRET!) as any //
    req.user = payload
  } catch (err) {
    res.status(401)
    if (err === 'TokenExpiredError') {
      throw new Error(err)
    }
    throw new Error('🚫 Un-Authorized 🚫')
  }

  return next()
}

// export default {
//   unknownEndpoint,
//   errorHandler,
//   isAuthenticated
// }