import type { FastifyInstance } from 'fastify'

import { isAuthorized } from '../../http/middlewares/authorization.middleware'
import { handler as createProjectsHandler } from './handlers/createProject.handler'
import { handler as retrieveProjectHandler } from './handlers/retrieveProject.handler'
import { handler as retrieveProjectLimitsHandler } from './handlers/retrieveProjectLimits.handler'
import { handler as retrieveProjectPlateausHandler } from './handlers/retrieveProjectPlateaus.handler'
import { handler as updateProjectLimitsHandler } from './handlers/updateProjectLimits.handler'
import { handler as updateProjectPlateausHandler } from './handlers/updateProjectPlateaus.handler'
import { schema as createProjectPayloadSchema } from './schemas/createProjectPayload.schema'
import { schema as createProjectResponseSchema } from './schemas/createProjectResponse.schema'
import { schema as retrieveProjectLimitsParametersSchema } from './schemas/retrieveProjectLimitsParameters.schema'
import { schema as retrieveProjectLimitsResponseSchema } from './schemas/retrieveProjectLimitsResponse.schema'
import { schema as retrieveProjectParametersSchema } from './schemas/retrieveProjectParameters.schema'
import { schema as retrieveProjectPlateausParametersSchema } from './schemas/retrieveProjectPlateausParameters.schema'
import { schema as retrieveProjectPlateausResponseSchema } from './schemas/retrieveProjectPlateausResponse.schema'
import { schema as retrieveProjectResponseSchema } from './schemas/retrieveProjectResponse.schema'
import { schema as updateProjectLimitsParametersSchema } from './schemas/updateProjectLimitsParameters.schema'
import { schema as updateProjectLimitsPayloadSchema } from './schemas/updateProjectLimitsPayload.schema'
import { schema as updateProjectLimitsResponseSchema } from './schemas/updateProjectLimitsResponse.schema'
import { schema as updateProjectPlateausParametersSchema } from './schemas/updateProjectPlateausParameters.schema'
import { schema as updateProjectPlateausPayloadSchema } from './schemas/updateProjectPlateausPayload.schema'
import { schema as updateProjectPlateausResponseSchema } from './schemas/updateProjectPlateausResponse.schema'

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
      params: retrieveProjectParametersSchema,
      response: {
        200: retrieveProjectResponseSchema,
      },
    },
    handler: retrieveProjectHandler,
    preParsing: [isAuthorized],
  })

  void instance.route({
    method: 'PUT',
    url: '/:projectId/limits',
    schema: {
      tags: ['Projects'],
      params: updateProjectLimitsParametersSchema,
      body: updateProjectLimitsPayloadSchema,
      response: {
        200: updateProjectLimitsResponseSchema,
      },
    },
    handler: updateProjectLimitsHandler,
    preParsing: [isAuthorized],
  })

  void instance.route({
    method: 'GET',
    url: '/:projectId/limits',
    schema: {
      tags: ['Projects'],
      params: retrieveProjectLimitsParametersSchema,
      response: {
        200: retrieveProjectLimitsResponseSchema,
      },
    },
    handler: retrieveProjectLimitsHandler,
    preParsing: [isAuthorized],
  })

  void instance.route({
    method: 'PUT',
    url: '/:projectId/plateaus',
    schema: {
      tags: ['Projects'],
      params: updateProjectPlateausParametersSchema,
      body: updateProjectPlateausPayloadSchema,
      response: {
        200: updateProjectPlateausResponseSchema,
      },
    },
    handler: updateProjectPlateausHandler,
    preParsing: [isAuthorized],
  })

  void instance.route({
    method: 'GET',
    url: '/:projectId/plateaus',
    schema: {
      tags: ['Projects'],
      params: retrieveProjectPlateausParametersSchema,
      response: {
        200: retrieveProjectPlateausResponseSchema,
      },
    },
    handler: retrieveProjectPlateausHandler,
    preParsing: [isAuthorized],
  })
}
