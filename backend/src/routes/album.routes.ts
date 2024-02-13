import express from "express";
import * as albums from "../controller/album";

const routes = express.Router();

routes.get("/", albums.getAll);
routes.get("/:id", albums.getOne);
routes.post("/", albums.createAlbum);
routes.put("/:id", albums.updateAlbum);
routes.delete("/:id", albums.deleteAlbum);

export default routes;