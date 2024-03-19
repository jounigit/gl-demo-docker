/* eslint-disable @typescript-eslint/no-unused-vars */
import { NextFunction, Request, Response } from 'express'
import bcrypt from  'bcrypt'
import { errorHandler } from '../utils/errorHandler'
import { PrismaClientKnownRequestError, PrismaClientValidationError } from '@prisma/client/runtime/library'
import { getFromCache } from '../services/redis'
import { routeAuth } from '../routes/routeHelper'
import { getUserFromHeader } from './userFromHeader'
import { prisma } from '../services/prisma'
import { UnauthorizedError } from 'express-jwt'
import { User } from '@prisma/client'

// GET /users - Get all users
export const getAll = async (req: Request, res: Response) => {
  // const user = getUserFromHeader(req.headers['authorization']!)
  console.log('GET / AUTH:: ', req.user)
  // console.log('2. GET / AUTH:: ', req.headers['authorization'])
  const allUsers = await prisma.user.findMany({})
  return res.json(allUsers)
}

// Get a single user by its id
export const getOne = async (req: Request, res: Response) => {
  const { id } = req.params

  const user = await prisma.user.findUnique({
    where: { id : parseInt(id) },
    include: {
      albums: true,
      pictures:  true,
    } // Include the related
  })
  if (!user) throw new Error( `No user found with id ${id}`, )

  return res.json(user)
}

// interface NewUser  extends Pick<User, 'username'| 'email'| 'password'>
interface Data {
  username: string;
  email: string;
  password: string;
}

// Create  a new user
export const createUser = async (data: Data): Promise<User> => {
  return await prisma.user.create({ data })
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

  if(!deletedUser) throw new Error(`No user with ID ${id}`)
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