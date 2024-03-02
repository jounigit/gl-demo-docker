import express from 'express'
import { logout } from '../controller/auth'

const routes = express.Router()

routes.delete('/', logout)

export default routes