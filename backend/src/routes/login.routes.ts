import express from 'express'
import loginController from '../controller/login'

const routes = express.Router()

routes.post('/', loginController.login)

export default routes