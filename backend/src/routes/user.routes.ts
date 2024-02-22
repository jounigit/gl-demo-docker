/* eslint-disable @typescript-eslint/no-var-requires */
import express from 'express'
// import jwtAuth from 'express-jwt'
const { expressjwt:jwt } = require('express-jwt')
import * as users from '../controller/user'
import config from '../utils/config'

const routes = express.Router()

const routeAuth = jwt( { secret: `${config.JWT_SECRET}`,  algorithms: ['HS256'] } )

routes.get('/', routeAuth, users.getAll)
routes.get('/:id', users.getOne)
routes.post('/', users.createUser)
routes.put('/:id', users.updateUser)
routes.delete('/:id', users.deleteUser)

export default routes