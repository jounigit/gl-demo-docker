import express from 'express'
import multer from  'multer'
import * as pictures from '../controller/picture'
import { pictureUpload } from '../controller/picture.upload'


const upload = multer({ dest: './images' })

const routes = express.Router()

routes.get('/', pictures.getAll)
routes.get('/:id', pictures.getOne)
routes.post('/', pictures.createPicture)
routes.put('/:id', pictures.updatePicture)
routes.delete('/:id', pictures.deletePicture)
routes.post('/upload', upload.single('image'), pictureUpload)

export default routes
