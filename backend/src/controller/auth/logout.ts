import { Request, Response } from 'express'
import { getUserFromHeader } from '../userFromHeader'
import { removeFromCache } from '../../services/redis'

const logout = async (req:Request, res:Response) => {
  const user = getUserFromHeader(req.headers['authorization']!)
  console.log(`Logout user: ${user}`)
  if (!user || !user.id) {
    return res.status(400).json({ error: 'Missing authentication' })
  }

  const key = `user:${user.id}`
  try{
    const red = await removeFromCache(key)
    console.log(`Redis result ${red}`)
    res.status(204).json({ message:  'Logged out' })
  }catch(err){
    console.log('Error to logout', err)
    return res.status(500).json({ message:'Server error' })
  }
}

export default logout