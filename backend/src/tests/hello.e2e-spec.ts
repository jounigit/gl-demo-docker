import request from 'supertest'
import app from '../app'

describe('Hello world', () => {
  it('should display hello world message', async () => {
    const response = await request(app).get('/health').send()

    expect(response.statusCode).toBe(200)
  })
})