import { strictEqual } from 'node:assert'
import { test } from 'node:test'

import { createInstance } from '../../../core/instance.core'
import { module } from '../loader'

const authToken = 'your-auth-token-here'
const validProjectId = '019317c1-b9a9-756b-937e-b5c729c528b0'
const validInexistentProjectId = '483d6b88-a5b2-4afe-a9f2-e14c2b0f2cc6'
const invalidProjectId = 'invalidProjectId'

test('should return 200 for existent project id', async (test) => {
  const instance = await createInstance([module])

  test.after(async () => await instance.close())

  const response = await instance.inject({
    method: 'GET',
    url: `/v1/projects/${validProjectId}`,
    headers: {
      Authorization: `Bearer ${authToken}`,
    },
  })

  strictEqual(response.statusCode, 200)
})

test('should return 404 for inexistent project id', async (test) => {
  const instance = await createInstance([module])

  test.after(async () => await instance.close())

  const response = await instance.inject({
    method: 'GET',
    url: `/v1/projects/${validInexistentProjectId}`,
    headers: {
      Authorization: `Bearer ${authToken}`,
    },
  })

  strictEqual(response.statusCode, 404)
})

test('should return 400 for invalid project id', async (test) => {
  const instance = await createInstance([module])

  test.after(async () => await instance.close())

  const response = await instance.inject({
    method: 'GET',
    url: `/v1/projects/${invalidProjectId}`,
    headers: {
      Authorization: `Bearer ${authToken}`,
    },
  })

  strictEqual(response.statusCode, 400)
})

test('should return 400 for missing project id', async (test) => {
  const instance = await createInstance([module])

  test.after(async () => await instance.close())

  const response = await instance.inject({
    method: 'GET',
    url: '/v1/projects/',
    headers: {
      Authorization: `Bearer ${authToken}`,
    },
  })

  strictEqual(response.statusCode, 400)
})

test('should return 401 when authentication token is missing', async (test) => {
  const instance = await createInstance([module])

  test.after(async () => await instance.close())

  const response = await instance.inject({
    method: 'GET',
    url: `/v1/projects/${validProjectId}`,
  })

  strictEqual(response.statusCode, 401)
})
