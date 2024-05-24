import express from 'express'
import multer from 'multer'
import * as pictures from '../controller/picture'
import { pictureUpload } from '../controller/pictureUpload'
import Auth from '../utils/middleware'
import { pictureUploadC } from '../controller/picture.controller'

const upload = multer({ dest: './images' })

const routes = express.Router()

routes.get('/', pictures.getAll)
routes.get('/:id', pictures.getOne)
routes.post('/', Auth.authenticateToken, pictures.create)
routes.put('/:id', Auth.authenticateToken, pictures.update)
routes.delete('/:id', Auth.authenticateToken, pictures.remove)
routes.post('/upload', Auth.authenticateToken, upload.single('image'), pictureUpload)
routes.post('/picture-upload', Auth.authenticateToken, upload.single('image'), pictureUploadC)

export default routes
