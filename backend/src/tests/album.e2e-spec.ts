// import { Album } from '@prisma/client';
import request from 'supertest'
import app from '../app'
import { prisma } from '@/services/prisma'
import helper from './test-helpers'

let user: Promise<{ id: number; username: string; email: string; password: string; createdAt: Date; updatedAt: Date }>
let token: unknown

describe('Album controller', () => {
  beforeAll(async () => {
    user = helper.addTestUser()
    await prisma.album.createMany({
      data: [
        { title: 'First album', userID: (await user).id },
        { title: 'Second album', userID: (await user).id }
      ]
    })
    console.log(token)
  })

  it('should display albums', async () => {
    const response = await request(app).get('/api/albums').send().expect(200)

    expect(response.body.length).toBe(2)
    expect(typeof response.body[0].id).toBe('number')
    expect(response.body[0].title).toBe('First album')
  })

  it('should display one album by id', async () => {
    const response = await request(app).get('/api/albums').send().expect(200)
    const id = response.body[0].id
    const singleResponse = await request(app).get(`/api/albums/${id}`).send().expect(200)

    expect(singleResponse.body.id).toEqual(id)
    expect(singleResponse.body.title).toEqual(response.body[0].title)
  })

  it('Should create an album with valid credentials', async ()  => {
    const newAlbum = {
      title: 'New Album',
      content:'This is a brand new album'
    }

    const user1 = (await user)
    token = helper.generateValidToken(user1.id, user1.username, user1.email)

    const res = await request(app)
      .post('/api/albums')
      .set('Authorization', `Bearer ${token}`)
      .send(newAlbum)
      .expect(201)

    Object.assign(newAlbum, { userID:(await user).id })
    expect(res.body).toBeTypeOf('object')
  })

  it('Should update album  details if the owner of the album', async() => {
    // const album = await prisma.album.findFirst({where:{title:"New Album"}})
    const { body } = await request(app).get('/api/albums').send().expect(200)
    token = helper.generateValidToken(((await user).id), helper.username, helper.email)
    let res = await request(app)
      .put('/api/albums/'+body[0].id)
      .set('Authorization', 'Bearer '+token)
      .send({ content : 'Updated Content!' })

    expect(res.status).toBe(200)
    expect(res.body.content).toMatch(/Updated Content!/)
    res = await request(app).get('/api/albums')
      .send().expect(200)
    expect(res.body.length).toBeGreaterThan(1)
  })

  it('Should delete album with valid credentials'  ,async() => {
    const { id : albumId } = (await request(app).get('/api/albums').send()).body[0]
    await request(app)
      .delete(`/api/albums/${albumId}`).expect(200)
  })
})

// it('should fail  to get an invalid album', async () => {
//   // await expect(getAlbumOrThrowError(2)).rejects.toThrow('No album found with id 2')

//   // // await request(app).get('/api/albums/1000').send().expect(404)
//   // // expect(async () => await request(app).get('/api/albums/1000')
//   // //   .send()).toThrow(/Invalid id "404"/)

//   // // const req = async () => await request(app).get('/api/albums/1000').send()
//   // // expect(req).not.toHaveBeenCalled()
//   // expect(req).toHaveBeenCalledWith(new Error('test error'))

//   // expect(req).rejects.toHaveProperty('error', 'Invalid id')
// })