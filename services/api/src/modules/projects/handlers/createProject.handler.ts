import type { RouteHandler } from 'fastify'

import type { CreateProjectPayload } from '../schemas/createProjectPayload.schema'
import { createProjectResponseMock } from '../mocks/createProjectResponse.mock'

export const handler: RouteHandler<{
  Params: unknown
  Querystring: unknown
  Body: CreateProjectPayload
}> = async function (_, reply) {
  const project = createProjectResponseMock

  return reply.created(project)
}
