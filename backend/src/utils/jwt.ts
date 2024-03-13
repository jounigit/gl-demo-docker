import { User } from '@prisma/client'
import * as jwt from 'jsonwebtoken'
import config from './config'

const secret = config.JWT_SECRET!
const secret_refresh =  config.JWT_REFRESH_SECRET!

function generateAccessToken(user: Partial<User>) {
  return jwt.sign({ userId: user.id }, secret, {
    expiresIn: '5m',
  })
}

function generateRefreshToken(user: Partial<User>, jti:  string) {
  return jwt.sign({
    userId: user.id,
    jti
  }, secret_refresh, {
    expiresIn: '4h',
  })
}

function generateTokens(user: Partial<User>, jti:  string) {
  const accessToken = generateAccessToken(user)
  const refreshToken = generateRefreshToken(user, jti)

  return {
    accessToken,
    refreshToken,
  }
}

export default {
  generateAccessToken,
  generateRefreshToken,
  generateTokens,
}