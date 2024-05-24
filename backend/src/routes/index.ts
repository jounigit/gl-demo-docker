import { Router } from 'express'
import userRoutes from './user.routes'
import albumRoutes from './album.routes'
import pictureRoutes from './picture.routes'
import albumsOnPictures from './albumsOnPicture.routes'
import authRoutes from './auth.routes'
import { create } from '../controller/picture'

const routes = Router()

routes.use('/users', userRoutes)
routes.use('/albums', albumRoutes)
routes.use('/pictures', pictureRoutes)
routes.use('/album-picture', albumsOnPictures)
routes.use('/', authRoutes)
routes.use('/new', create)

export default routes

