import request from 'supertest'
import app from '../app' // assuming that the routes are defined in app.js
import { Album } from '@prisma/client'

let testAlbum: Album

describe('Albums', () => {
  describe('GET /albums', () => {
    it('should return all albums', async () => {
      const res = await request(app)
        .get('/albums')
        .expect(200)
      expect(res.body).toBeInstanceOf(Array)
    })
  })

  describe('GET /albums/:id', () => {
    it('should return a single album by id', async () => {
      const albumId = 1 // replace with an existing album id
      const res = await request(app)
        .get(`/albums/${albumId}`)
        .expect(200)
      expect(res.body).toHaveProperty('id', albumId)
    })

    it('should return a 404 error if album is not found', async () => {
      const albumId = 999 // replace with a non-existing album id
      await request(app)
        .get(`/albums/${albumId}`)
        .expect(404)
    })
  })

  describe('POST /albums', () => {
    it('should create a new album', async () => {
      const res = await request(app)
        .post('/albums')
        .send({
          title: 'New Album',
          userId: 11 // replace with an existing user id
        })
        .expect(201)
      testAlbum = res.body
      expect(res.body).toHaveProperty('id')
      expect(res.body).toHaveProperty('title', 'New Album')
    })

    it('should return a 400 error if missing data or authentication', async () => {
      await request(app)
        .post('/albums')
        .send({
          title: 'New Album'
        })
        .expect(400)
    })
  })

  describe('PUT /albums/:id', () => {
    it('should update an existing album', async () => {
      const albumId = 11 // replace with an existing album id
      const res = await request(app)
        .put(`/albums/${albumId}`)
        .send({
          title: 'Updated Album'
        })
        .expect(200)
      expect(res.body).toHaveProperty('id', albumId)
      expect(res.body).toHaveProperty('title', 'Updated Album')
    })

    it('should return a 404 error if album is not found', async () => {
      const albumId = 999 // replace with a non-existing album id
      await request(app)
        .put(`/albums/${albumId}`)
        .send({
          title: 'Updated Album'
        })
        .expect(404)
    })

    it('should return a 400 error if nothing to update', async () => {
      const albumId = testAlbum.id // replace with an existing album id
      await request(app)
        .put(`/albums/${albumId}`)
        .send({})
        .expect(400)
    })
  })

  describe('DELETE /albums/:id', () => {
    it('should delete an existing album', async () => {
      const albumId = testAlbum.id // replace with an existing album id
      await request(app)
        .delete(`/albums/${albumId}`)
        .expect(200)
    })

    it('should return a 404 error if album is not found', async () => {
      const albumId = 999 // replace with a non-existing album id
      await request(app)
        .delete(`/albums/${albumId}`)
        .expect(404)
    })
  })
})
