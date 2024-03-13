import express from 'express'
import logoutController from '../controller/auth/logout'

const routes = express.Router()

routes.delete('/', logoutController)

export default routes