import type { RouteHandler } from 'fastify'
import { retrieveProjectResponseMock } from '../mocks/retrieveProjectResponse.mock'

export const handler: RouteHandler<{
  Params: unknown
}> = async function (_, reply) {
  const project = retrieveProjectResponseMock

  return reply.ok(project)
}
