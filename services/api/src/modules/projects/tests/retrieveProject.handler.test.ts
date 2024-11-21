import { FastifyInstance } from 'fastify'
import { strictEqual } from 'node:assert'
import { after, before, suite, test } from 'node:test'

import { createInstance } from '../../../core/instance.core'
import { module } from '../loader'
import { existentAuthenticationToken } from './cases/authentication.case'
import { existentProjectId, inexistentProjectId, invalidUuidProjectId } from './cases/projects.case'

suite('retrieveProject.handler', () => {
  let instance: FastifyInstance

  before(async () => {
    instance = await createInstance([module])
  })

  after(async () => {
    await instance.close()
  })

  test('should return 200 for existent project id', async () => {
    const response = await instance.inject({
      method: 'GET',
      url: `/v1/projects/${existentProjectId}`,
      headers: {
        Authorization: `Bearer ${existentAuthenticationToken}`,
      },
    })

    strictEqual(response.statusCode, 200)
  })

  test('should return 404 for inexistent project id', async () => {
    const response = await instance.inject({
      method: 'GET',
      url: `/v1/projects/${inexistentProjectId}`,
      headers: {
        Authorization: `Bearer ${existentAuthenticationToken}`,
      },
    })

    strictEqual(response.statusCode, 404)
  })

  test('should return 400 for invalid project id', async () => {
    const response = await instance.inject({
      method: 'GET',
      url: `/v1/projects/${invalidUuidProjectId}`,
      headers: {
        Authorization: `Bearer ${existentAuthenticationToken}`,
      },
    })

    strictEqual(response.statusCode, 400)
  })

  test('should return 400 for missing project id', async () => {
    const response = await instance.inject({
      method: 'GET',
      url: '/v1/projects/',
      headers: {
        Authorization: `Bearer ${existentAuthenticationToken}`,
      },
    })

    strictEqual(response.statusCode, 400)
  })

  test('should return 401 when authentication token is missing', async () => {
    const response = await instance.inject({
      method: 'GET',
      url: `/v1/projects/${existentProjectId}`,
    })

    strictEqual(response.statusCode, 401)
  })
})
