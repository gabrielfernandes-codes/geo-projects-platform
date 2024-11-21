import { FastifyInstance } from 'fastify'
import { after, before, suite, test } from 'node:test'

import { createInstance } from '../../../core/instance.core'
import { module } from '../loader'

suite('createProject.handler', () => {
  let instance: FastifyInstance

  before(async () => {
    instance = await createInstance([module])
  })

  after(async () => {
    await instance.close()
  })

  test.todo('should return 201 for valid project')

  test.todo('should return 400 for invalid project')

  test.todo('should return 401 when authentication token is missing')
})
