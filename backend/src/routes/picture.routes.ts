import express from 'express'
import multer from 'multer'
import * as pictures from '../controller/picture'
import Auth from '../utils/middleware'

const upload = multer({ dest: './images' })

const routes = express.Router()

routes.get('/', pictures.getAll)
routes.get('/:id', pictures.getOne)
routes.post('/', Auth.authenticateToken, pictures.create)
routes.put('/:id', Auth.authenticateToken, pictures.update)
routes.delete('/:id', Auth.authenticateToken, pictures.remove)
routes.post('/upload', Auth.authenticateToken, upload.single('image'), pictures.upload)

export default routes
