import express from 'express'
import * as albums from '../controller/album'

const routes = express.Router()

routes.get('/:slug', albums.getBySlug)

export default routes