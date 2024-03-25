import { Router } from 'express'
import userRoutes from './user.routes'
import albumRoutes from './album.routes'
import pictureRoutes from './picture.routes'
import albumsOnPictures from './albumsOnPicture.routes'
import authRoutes from './auth.routes'

const routes = Router()

routes.use('/users', userRoutes)
routes.use('/albums', albumRoutes)
routes.use('/pictures', pictureRoutes)
routes.use('/album-picture', albumsOnPictures)
routes.use('/', authRoutes)

export default routes

