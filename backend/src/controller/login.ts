import { Request, Response } from 'express'
import bcrypt from 'bcrypt'
import jwt  from 'jsonwebtoken'
import { prisma } from '../app'


const login = async (req: Request, res: Response) => {
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

  const userForToken = {
    username: user.name,
    id: user.id
  }

  const token = jwt.sign(userForToken, process.env.JWT_SECRET!)

  // Return the user and token as JSON
  res.status(200).json({
    token,
    user: {
      name: user.name,
      id: user.id
    },
  })
}


export default { login }