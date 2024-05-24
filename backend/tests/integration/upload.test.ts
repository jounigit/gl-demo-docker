import { test, expect } from 'vitest'
import request from 'supertest'
import app from 'src/app'
import fs from 'fs'
import path from 'path'

const filePath = path.resolve(__dirname, '../fixtures/test.jpg')

test('uploads a picture and creates a new record in the database', async () => {
  const response = await request(app)
    .post('/api/picture/picture-upload')
    .attach('file', filePath)
    .field('title', 'Test Picture')
    .expect(200)

  expect(response.body).toHaveProperty('id')
  expect(response.body).toHaveProperty('title', 'Test Picture')
  expect(response.body).toHaveProperty('image', 'test.jpg')
  expect(response.body).toHaveProperty('userID', 1)
  expect(response.body).toHaveProperty('createdAt')
  expect(response.body).toHaveProperty('updatedAt')

  const fileExists = fs.existsSync(filePath)
  expect(fileExists).toBe(false)
})

test('returns an error if the file is too large', async () => {
  const largeFilePath = path.resolve(__dirname, '../fixtures/large-test.jpg')
  const stats = fs.statSync(largeFilePath)
  const fileSizeInMB = stats.size / (1024 * 1024)

  const response = await request(app)
    .post('/api/picture/picture-upload')
    .attach('file', largeFilePath)
    .field('title', 'Large Test Picture')
    .expect(400)

  expect(response.body).toHaveProperty('message', `File too large! Maximum file size is 2mb. Received file size: ${fileSizeInMB}mb`)
})

test('returns an error if the file type is invalid', async () => {
  const invalidFilePath = path.resolve(__dirname, '../fixtures/test.txt')

  const response = await request(app)
    .post('/api/picture/picture-upload')
    .attach('file', invalidFilePath)
    .field('title', 'Invalid Test Picture')
    .expect(400)

  expect(response.body).toHaveProperty('message', 'Invalid file type!')
})
