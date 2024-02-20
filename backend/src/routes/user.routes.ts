import express from 'express'
import * as users from '../controller/user'

const routes = express.Router()

routes.get('/', users.getAll)
routes.get('/:id', users.getOne)
routes.post('/', users.createUser)
routes.put('/:id', users.updateUser)
routes.delete('/:id', users.deleteUser)

export default routes