/* eslint-disable @typescript-eslint/no-unused-vars */
import { NextFunction, Request, Response } from 'express'
import { prisma } from '../app'
import bcrypt from  'bcrypt'
import { errorHandler } from '../utils/errorHandler'
import { PrismaClientValidationError } from '@prisma/client/runtime/library'
import { getFromCache } from '../services/redis'
import { routeAuth } from '../routes/routeHelper'
import { getUserFromHeader } from './userFromHeader'

// GET /users - Get all users
export const getAll = async (req: Request, res: Response) => {
  const user = getUserFromHeader(req.headers['authorization']!)
  console.log('GET / AUTH:: ', user)
  console.log('2. GET / AUTH:: ', req.headers['authorization'])
  const allUsers = await prisma.user.findMany({})
  return res.json(allUsers)
}

// Get a single user by its id
export const getOne = async (req: Request, res: Response, next: NextFunction) => {
  const { id } = req.params
  try{
    const user = await prisma.user.findUnique({ where: { id : parseInt(id) } })
    if(!user) return res.status(404).json({ error: 'User not found' })
    return res.json(user)
  } catch (e) {
    console.log(e)
    next(e)
  }
}

// Create  a new user
export const createUser = async (req: Request, res: Response) => {
  const { username, email, password } = req.body
  if (!username || !email || !password) {
    return res.status(400).send('Missing data')
  }

  const saltRounds = 10
  const passwordHash = await bcrypt.hash(password, saltRounds)

  const newUser = {
    username,
    email,
    password: passwordHash
  }

  try {
    const user = await prisma.user.create({ data: newUser })
    if (!user) throw new Error('Failed to create user')
    else return res.status(201).json(user)
  } catch (err) {
    console.error(err)
    return res.status(500).json({ error: err })
  }
}

// Update an existing user
export const updateUser = async (req: Request, res: Response) => {
  const id = parseInt(req.params.id as string)
  const updatedUser = await prisma.user.update({ where: { id }, data: req.body })
  if (!updatedUser) throw new Error(`No user with ID ${id}`)
  else return res.json(updatedUser)
}

// This route is used for deleting a single user by their ID
export const deleteUser =  async (req: Request, res: Response) => {
  const id = parseInt(req.params.id as string)
  const deletedUser = await prisma.user.delete({ where: { id } })

  if(!deletedUser) return res.status(404).send(`No user with the id ${id} was found.`)
  else return res.status(200).send(deletedUser)
}

// export const getOne = async (req: Request, res: Response, next: NextFunction) => {
//   const { id } = req.params
//   try{
//     const user = await prisma.user.findUnique({ where: { id : parseInt(id) } })
//     if(!user) return res.status(404).json({ error: 'User not found' })
//     return res.json(user)
//   } catch (e) {
//     console.log(e)
//     next(e)
//     // if ( e instanceof PrismaClientValidationError) {
//     //   res.status(500).json({ error: 'an unknown error occured, check your server logs for more info' })
//     // }
//     // const error = errorHandler(e)
//     // res.send(error)
//   }
//   // const user = await prisma.user.findUnique({
//   //   where: { id: parseInt(id) },
//   //   include: {
//   //     albums: true,
//   //     pictures: true,
//   //   }
//   // })
//   // if (!user) return res.status(404).json({ error: 'User not found' })
//   // else return res.json(user)
// }