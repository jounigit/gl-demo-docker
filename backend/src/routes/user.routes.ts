import express from 'express'
import * as users from '../controller/user'
import Auth from '../utils/middleware'

const routes = express.Router()

routes.get('/', Auth.authenticateToken, users.getAll)
routes.get('/:id', users.getOne)
routes.post('/', Auth.authenticateToken, users.createUser)
routes.put('/:id', Auth.authenticateToken, users.updateUser)
routes.delete('/:id', Auth.authenticateToken, users.deleteUser)

export default routes