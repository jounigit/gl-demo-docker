/* eslint-disable @typescript-eslint/no-explicit-any */
import jwt from 'jsonwebtoken'
import type { User } from '@prisma/client'
import config from '../config'
import type { TokenFromUser } from './auth/authHelper'

function getAuthTokenFromHeader(header: string): string | null {
  const authHeader = header.split(' ')
  console.log(`Auth user: ${authHeader}`)
  if (authHeader[0].toLowerCase() === 'bearer') {
    return authHeader[1]
  }
  return null
}

function decodeAuthToken(token: string): TokenFromUser | null {
  if (!token) {
    return null
  }
  try {
    // biome-ignore lint/style/noNonNullAssertion: <explanation>
    const decoded = jwt.verify(token, config.JWT_SECRET!) as TokenFromUser
    return {
      id: decoded.id,
      username: decoded.username,
      email: decoded.email,
    }
  } catch (error) {
    console.error(error)
    return null
  }
}

export function getUserFromHeader(header: string): Partial<User> | null {
  if (!header) {
    return null
  }
  const token = getAuthTokenFromHeader(header)
  if (!token) {
    throw new Error('Invalid Authorization Header')
  }
  return decodeAuthToken(token)
}
