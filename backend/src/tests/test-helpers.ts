import { createUser } from '@/controller/user'
import request from 'supertest'
import app from '../app'
import bcrypt from 'bcrypt'
import jwt  from 'jsonwebtoken'
import { User } from '@prisma/client'

function generateValidToken(id: number, username: string, email: string) {
  const userForToken: Partial<User> = {
    id,
    username,
    email,
  }
  return jwt.sign(userForToken, process.env.JWT_SECRET!)
}

//********** user helpers *******************************/
const username = 'test'
const email = 'test@mail.com'
const password = 'testpassi'

const addTestUser = async (user=username, mail=email, pass=password) => {
  const saltRounds = 10
  const passwordHash = await bcrypt.hash(pass, saltRounds)

  const testUser = {
    username: user,
    email: mail,
    password: passwordHash
  }

  const newUser = await createUser(testUser)
  console.log('Testhelper New user: ', newUser)
  return newUser
}

const getToken = async (user=username, pass=password) => {
  const response = await request(app)
    .post('/api/login')
    .send({
      username:user,
      password:pass,
    })

  console.log('GET VALID TOKEN: ', response.body.token)
  return response.body.token
}

export default {
  addTestUser,
  getToken,
  generateValidToken,
  username,
  email,
}