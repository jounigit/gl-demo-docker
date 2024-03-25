import request from 'supertest'

import app from '../app'

describe('Test health route', () => {
  test('Catch-all route', async () => {
    const res = await request(app).get('/health').expect(200)
    console.log('VASTAUS::::::: ', res.text)
    expect(res.text).toBe('ok health')
    // expect(res.body).toEqual({ message: 'Allo! Catch-all route.' })
  })
})
