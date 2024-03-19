import request from 'supertest'
import app from '../app'

describe('Auth', async () => {
  describe('[POST] /api/signin', () => {
    it('should respond with a `201` status code and user details', async () => {
      const data = {
        username: 'testuser',
        email: 'testuser@example.com',
        password: 'testpassword',
      }

      const res = await request(app)
        .post('/api/signin')
        .send(data)
        .expect(201)

      expect(res.body).toHaveProperty('id')
      expect(res.body).toHaveProperty('username', data.username)
      expect(res.body).toHaveProperty('email', data.email)
    })

    it('should return a 400 error if missing data', async () => {
      const data = {
        email: 'testuser@example.com'
      }

      await request(app)
        .post('/api/signin')
        .send(data)
        .expect(400)
    })

    // it('should return a 400 error if email is already in use', async () => {
    //   const data = {
    //     username: 'testuser',
    //     email: 'testuser@example.com',
    //     password: 'testpassword',
    //   }

    //   await request(app).post('/api/signin').send(data)

    //   await request(app)
    //     .post('/signin')
    //     .send(data)
    //     .expect(400)
    // })
  })
})