import { FastifyInstance } from 'fastify'
import { strictEqual } from 'node:assert'
import { after, before, suite, test } from 'node:test'

import { createInstance } from '../../../core/instance.core'
import { module } from '../loader'
import { existentAuthenticationToken } from './cases/authentication.case'

suite('checkHealth.handler', () => {
  let instance: FastifyInstance

  before(async () => {
    instance = await createInstance([module])
  })

  after(async () => {
    await instance.close()
  })

  test('should return 200', async () => {
    const response = await instance.inject({
      method: 'GET',
      url: `/v1/healthcheck`,
      headers: {
        Authorization: `Bearer ${existentAuthenticationToken}`,
      },
    })

    strictEqual(response.statusCode, 200)
  })

  test('should return 401 when authentication token is missing', async () => {
    const response = await instance.inject({
      method: 'GET',
      url: `/v1/healthcheck`,
    })

    strictEqual(response.statusCode, 401)
  })
})
