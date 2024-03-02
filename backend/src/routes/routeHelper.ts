import config from '../utils/config'
import { expressjwt as jwt } from 'express-jwt'

export const routeAuth = jwt( { secret: `${config.JWT_SECRET}`,  algorithms: ['HS256'] } )