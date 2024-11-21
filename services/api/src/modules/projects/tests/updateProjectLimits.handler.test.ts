import { FastifyInstance } from 'fastify'
import { after, before, suite, test } from 'node:test'

import { createInstance } from '../../../core/instance.core'
import { module } from '../loader'

suite('updateProjectLimits.handler', () => {
  let instance: FastifyInstance

  before(async () => {
    instance = await createInstance([module])
  })

  after(async () => {
    await instance.close()
  })

  test.todo('should return 200 for existent project id')

  test.todo('should return 404 for inexistent project id')

  test.todo('should return 400 for invalid project id')

  test.todo('should return 400 for missing project id')

  test.todo('should return 200 for valid project limit')

  test.todo('should return 400 for invalid project limit')

  test.todo('should return 401 when authentication token is missing')
})
