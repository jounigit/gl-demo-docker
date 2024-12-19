import type { NextFunction, Request, Response } from 'express'
import { prisma } from '../services/prisma'
import jwt from 'jsonwebtoken'
import config from '../config'
import { ForbiddenError, UnauthorizedError } from '../helpers/api-errors'
import type { TokenFromUser } from '@/controller/auth/authHelper'

// biome-ignore lint/style/noNonNullAssertion: <explanation>
const JWTSECRET = config.JWT_SECRET!

export const verifyToken = async (req: Request, _: Response, next: NextFunction) => {
  try {
    const { authorization } = req.headers
    const token = authorization?.split(' ')[1] || ''

    if (!token || !authorization) {
      throw new UnauthorizedError()
    }

    const payload = jwt.verify(token, JWTSECRET) as TokenFromUser

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