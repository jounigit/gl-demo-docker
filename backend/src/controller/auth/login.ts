import type { Request, Response } from 'express'
import bcrypt from 'bcrypt'
import jwt from 'jsonwebtoken'
import type { User } from '@prisma/client'
import { setToCache } from '../../services/redis'
import { prisma } from '../../services/prisma'

const login = async (req: Request, res: Response) => {
  const { email, password } = req.body

  if (!email || !password)
    throw new Error( 'Missing data or authentication' )

  // let user: User | null
  // let passwordCorrect

  // if (email) {
  //   user = await prisma.user.findUnique({ where: { email } })
  // }

  const user = await prisma.user.findUnique({ where: { email } })
  if (!user) {
    throw new Error('Invalid email or password')
  }

  const passwordCorrect = await bcrypt.compare(password, user.password)

  if (!(user && passwordCorrect)) {
    return res.status(401).json({ message: 'Invalid email or password.' })
  }

  const userForToken: Partial<User> = {
    id: user.id,
    username: user.username,
    email: user.email
  }

  // biome-ignore lint/style/noNonNullAssertion: <explanation>
  const token = jwt.sign(userForToken, process.env.JWT_SECRET!)

  const toCache = {
    token,
    user: userForToken
  }
  // userForToken, process.env.JWT_SECRET!
  const key = `user:${user.id}`

  try {
    const red = await setToCache(key, JSON.stringify(toCache))
    console.log(`Redis result ${red}`)
    // Return the user and token as JSON
    res.status(200).json({
      status: 'success',
      data: toCache,
      message: 'You have successfully logged in.',
    })
  } catch (error) {
    console.log('Error setting cache ', error)
  }
}



export default login