import { Request, Response } from 'express'
import bcrypt from 'bcrypt'
import jwt from 'jsonwebtoken'
// import { prisma } from '../app'
import { removeFromCache, setToCache } from '../../services/redis'
import { User } from '@prisma/client'
import { getUserFromHeader } from '../userFromHeader'
import { prisma } from '../../services/prisma'

export const logout = async (req:Request, res:Response) => {
  const user = getUserFromHeader(req.headers['authorization']!)
  if (!user || !user.id) {
    return res.status(400).json({ error: 'Missing authentication' })
  }

  const key = `user:${user.id}`
  try{
    await removeFromCache(key)
    res.status(204).json({ message:  'Logged out' })
  }catch(err){
    console.log('Error to logout', err)
    return res.status(500).json({ message:'Server error' })
  }
}

// *****************************************************
export const login = async (req: Request, res: Response) => {
  const { email, password } = req.body

  let user
  let passwordCorrect

  if (email) {
    user = await prisma.user.findUnique({ where: { email } })
  }

  if (user) {
    passwordCorrect = await bcrypt.compare(password, user.password)
  }

  if (!(user && passwordCorrect)) {
    return res.status(401).json({ message: 'Invalid Credentials' })
  }

  const userForToken: Partial<User> = {
    id: user.id,
    username: user.username,
    email: user.email
  }

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
    res.status(200).json(toCache)
  } catch (error) {
    console.log('Error setting cache ', error)
  }
}


// export default {
//   login,
//   logout
// }