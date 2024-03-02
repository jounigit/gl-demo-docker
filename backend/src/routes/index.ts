import { Router } from 'express'
import userRoutes from './user.routes'
import albumRoutes from './album.routes'
import pictureRoutes from './picture.routes'
import loginRoutes from './login.routes'
import logoutRoutes from './logout.routes'
import albumsOnPictures from './albumsOnPicture.routes'

const routes = Router()

routes.use('/users', userRoutes)
routes.use('/albums', albumRoutes)
routes.use('/pictures', pictureRoutes)
routes.use('/album-picture', albumsOnPictures)
routes.use('/login', loginRoutes)
routes.use('/logout', logoutRoutes)

export default routes

