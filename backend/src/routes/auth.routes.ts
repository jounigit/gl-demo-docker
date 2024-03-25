import express from 'express'
import loginController from '../controller/auth/login'
import logoutController from '../controller/auth/logout'
import signin from '../controller/auth/signin'

const routes = express.Router()

routes.post('/login', loginController)
routes.delete('/logout', logoutController)
routes.post('/signin', signin)

export default routes