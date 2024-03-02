import express from 'express'
import * as albums from '../controller/album'
import { routeAuth } from './routeHelper'

const routes = express.Router()

routes.get('/', albums.getAll)
routes.get('/:id', albums.getOne)
routes.post('/', routeAuth, albums.createAlbum)
routes.put('/:id', routeAuth, albums.updateAlbum)
routes.delete('/:id', routeAuth, albums.deleteAlbum)

export default routes