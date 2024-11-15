/* eslint-disable @typescript-eslint/no-unused-vars */
import type { Request, Response } from 'express'
import bcrypt from 'bcrypt'
import {
  createUser,
  deleteUser,
  getUser,
  getUsers,
  updateUser,
} from '../model/user.model'

// GET /users - Get all users
export const getAll = async (req: Request, res: Response) => {
  const allUsers = await getUsers();
  return res.json(allUsers)
}

// Get a single user by its id
export const getOne = async (req: Request, res: Response) => {
  const id = Number.parseInt(req.params.id as string)

  const user = await getUser(id);

  return res.json(user)
};

export const create = async (req: Request, res: Response) => {
  const { username, email, password } = req.body;
  if (!username || !email || !password) {
    return res.status(400).send("Missing data");
  }

  const saltRounds = 10;
  const passwordHash = await bcrypt.hash(password, saltRounds)

  const newUser = {
    username,
    email,
    password: passwordHash,
  }

  const created = await createUser(newUser)
  return res.status(201).json(created)
}

// Update an existing user
export const update = async (req: Request, res: Response) => {
  const id = Number.parseInt(req.params.id as string)
  const updated = await updateUser(id, req.body);

  if (!updated) {
    return res.status(404).json({ message: 'No user found with that ID.' });
  }

  return res.json(updated);
};

// This route is used for deleting a single user by their ID
export const remove = async (req: Request, res: Response) => {
  const id = Number.parseInt(req.params.id as string);
  const deleted = await deleteUser(id);

  if (!deleted) throw new Error(`No user with ID ${id}`);
  return res.status(200).send(deleted);
};
