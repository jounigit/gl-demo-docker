import { prisma } from '../services/prisma'
import { User } from '@prisma/client'

export const getUsers = async (): Promise<User[]> => await prisma.user.findMany()

export const getUser = async (id: number): Promise<User | null> => {
  if (!id) return null

  const user = await prisma.user.findUnique({
    where: { id },
    include: {
      albums: true,
      pictures:  true,
    } // Include the related
  })
  if (!user) throw new Error( `No user found with id ${id}`, )

  return user
}

// interface NewUser  extends Pick<User, 'username'| 'email'| 'password'>
export interface NewUser {
    username: string;
    email: string;
    password: string;
  }

// Create  a new user
export const createUser = async (data: NewUser): Promise<User> => {
  const user = await prisma.user.create({ data })
  if (!user) throw new Error('Failed to create user')
  return user
}

export const updateUser = async (id: number, data: Partial<User>): Promise<User> => {
  const user = await getUser(id)
  if (!user) throw new Error(`Could not find user with id ${id}`)

  const updatedUser = await prisma.user.update({
    where: { id },
    data,
  })

  return updatedUser
}

export const deleteUser = async (id: number) :Promise<User> => {
  const user = await getUser(id)
  if(!user) throw new Error(`Could not find user with id ${id}`)

  const deletedUser = await prisma.user.delete({ where: { id } })
  return deletedUser
}