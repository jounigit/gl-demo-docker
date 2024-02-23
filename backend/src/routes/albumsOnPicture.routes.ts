import express from 'express'
import * as albumsOnPictures from '../controller/albumsOnPictures'

const routes = express.Router()

routes.post('/', albumsOnPictures.createAlbumsOnPictures)
routes.delete('/', albumsOnPictures.removeAlbumFromPicture)

export default routes