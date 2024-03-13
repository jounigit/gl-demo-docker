import { NextFunction, Request, Response } from 'express'
import { prisma } from '../services/prisma'
import jwt from 'jsonwebtoken'
import config from '../utils/config'

import { ForbiddenError, UnauthorizedError } from '../helpers/api-errors'

export const verifyToken = async (req: Request, _: Response, next: NextFunction) => {
  try {
    const { authorization } = req.headers
    const token = authorization && authorization.split(' ')[1] || ''

    if (!token || !authorization) {
      throw new UnauthorizedError()
    }

    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    const payload = jwt.verify(token, config.JWT_SECRET!) as any

    if (!payload )
      throw new UnauthorizedError()

    const user = await prisma.user.findFirst({
      where: {
        id: payload.id
      }
    })

    if (!user)
      throw new UnauthorizedError()

    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    const { password, ...loggedUser } = user
    req.user = loggedUser

    next()
  } catch (error: unknown) {
    throw new ForbiddenError()
  }
}