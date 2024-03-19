import express from 'express'
import signin from '../controller/auth/signin'

const routes = express.Router()

routes.post('/', signin)

export default routes