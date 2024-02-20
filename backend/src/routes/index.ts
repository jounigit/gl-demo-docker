import { Router } from 'express'
import userRoutes from './user.routes'
import albumRoutes from './album.routes'
import pictureRoutes from './picture.routes'

const routes = Router()

routes.use('/users', userRoutes)
routes.use('/albums', albumRoutes)
routes.use('/pictures', pictureRoutes)

export default routes

