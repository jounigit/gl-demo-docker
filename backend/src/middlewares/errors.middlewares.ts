import { Request, Response } from 'express'

import { ApiError } from '../helpers/api-errors'

export const errors = (error: Error & Partial<ApiError>, _: Request, res: Response) => {
  const statusCode = error.statusCode ?? 500
  const message = error.statusCode ? error.message : 'There was an internal server error.'

  return res.status(statusCode).json({
    statusCode,
    message: message
  })
}