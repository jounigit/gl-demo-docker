import express from 'express'
import multer from  'multer'
import * as pictures from '../controller/picture'
import { pictureUpload } from '../controller/pictureUpload'
import Auth from '../utils/middleware'

const upload = multer({ dest: './images' })

const routes = express.Router()

routes.get('/', pictures.getAll)
routes.get('/:id', pictures.getOne)
routes.post('/', Auth.authenticateToken, pictures.createPicture)
routes.put('/:id', Auth.authenticateToken, pictures.updatePicture)
routes.delete('/:id', Auth.authenticateToken, pictures.deletePicture)
routes.post('/upload', Auth.authenticateToken, upload.single('image'), pictureUpload)

export default routes
