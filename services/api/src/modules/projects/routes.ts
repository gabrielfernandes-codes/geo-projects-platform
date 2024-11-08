import type { FastifyInstance } from 'fastify'

import { isAuthorized } from '../../http/middlewares/authorization.middleware'
import { handler as createProjectsHandler } from './handlers/createProject.handler'
import { handler as retrieveProjectHandler } from './handlers/retrieveProject.handler'
import { schema as createProjectPayloadSchema } from './schemas/createProjectPayload.schema'
import { schema as createProjectResponseSchema } from './schemas/createProjectResponse.schema'
import { schema as retrieveProjectResponseSchema } from './schemas/retrieveProjectResponse.schema'

export const basePath = '/v1/projects'

export async function routes(instance: FastifyInstance): Promise<void> {
  void instance.route({
    method: 'POST',
    url: '/',
    schema: {
      tags: ['Projects'],
      body: createProjectPayloadSchema,
      response: {
        201: createProjectResponseSchema,
      },
    },
    handler: createProjectsHandler,
    preParsing: [isAuthorized],
  })

  void instance.route({
    method: 'GET',
    url: '/:projectId',
    schema: {
      tags: ['Projects'],
      response: {
        200: retrieveProjectResponseSchema,
      },
    },
    handler: retrieveProjectHandler,
    preParsing: [isAuthorized],
  })
}
