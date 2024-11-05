/* eslint-disable @typescript-eslint/no-explicit-any */
import type { Request, Response } from 'express'
import bcrypt from 'bcrypt'
import { prisma } from '../../services/prisma'
import { createUser } from '../../model/user.model'

const signin = async (req: Request, res: Response) => {
  const { username, email, password } = req.body
  if (!username || !email || !password) returnError(res, 'Missing credentials')

  const existingUser = await prisma.user.findFirst({
    where: { email }
  })

  if (existingUser) returnError(res, 'Email already in use')

  const saltRounds = 10
  const passwordHash = await bcrypt.hash(password, saltRounds)

  const data = {
    username,
    email,
    password: passwordHash
  }

  const newUser = await createUser(data)

  if (!newUser) throw new Error('Failed to create user')
  return res.status(201).json(newUser)
}

export default signin

// biome-ignore lint/suspicious/noExplicitAny: <explanation>
function returnError(res: Response<any, Record<string, any>>, msg: string) {
  return res.status(400).json({ error: msg })
}
// try {
//   const newUser = await prisma.user.create({ data })
//   if (!newUser) throw new Error('Failed to create user')
//   else return res.status(201).json(newUser)
// } catch (err) {
//   console.error(err)
//   return res.status(500).json({ error: err })
// }

