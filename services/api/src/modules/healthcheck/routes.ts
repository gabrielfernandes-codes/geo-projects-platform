import type { FastifyInstance } from 'fastify'

import { isAuthorized } from '../../http/middlewares/authorization.middleware'
import { handler as checkHealthHandler } from './handlers/checkHealth.handler'
import { schema as checkHealthResponseSchema } from './schemas/checkHealthResponse.schema'

export const basePath = '/v1/healthcheck'

export async function routes(instance: FastifyInstance): Promise<void> {
  void instance.route({
    method: 'GET',
    url: '/',
    schema: {
      tags: ['Healthcheck'],
      response: {
        200: checkHealthResponseSchema,
      },
    },
    handler: checkHealthHandler,
    preParsing: [isAuthorized],
  })
}
