import express from 'express'
import * as albums from '../controller/album'
import Auth from '../utils/middleware'

const routes = express.Router()

routes.get('/', albums.getAll)
routes.get('/:id', albums.getOne)
routes.post('/', Auth.authenticateToken, albums.create)
routes.put('/:id', Auth.authenticateToken, albums.update)
routes.delete('/:id', Auth.authenticateToken, albums.remove)

export default routes