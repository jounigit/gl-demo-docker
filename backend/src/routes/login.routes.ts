import express from 'express'
import loginController from '../controller/auth/login'

const routes = express.Router()

routes.post('/', loginController)

export default routes