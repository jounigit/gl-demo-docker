import jwt from 'jsonwebtoken'
import config from '../../config'
import type { User } from '@prisma/client'

export type TokenFromUser = Pick<User, 'id' | 'username' | 'email'>

// biome-ignore lint/style/noNonNullAssertion: <explanation>
const secret = config.JWT_SECRET!

export function generateAccessToken(user: TokenFromUser) {
  const payload = {
    id: user.id,
    username: user.username,
    email: user.email
  }

  // const secret = config.JWT_SECRET! // eslint-disable-line no-negated-in-lhs
  const options = {
    expiresIn: '1h',
  }

  return jwt.sign(payload, secret, options)
}

export function verifyAccessToken(token: string) {
  try {
    const decoded = jwt.verify(token, secret)
    return { success: true, data: decoded }
  } catch (error) {
    if (error instanceof jwt.JsonWebTokenError) {
      return { success: false, error: 'Invalid token' }
    }
    throw error
  }
}
