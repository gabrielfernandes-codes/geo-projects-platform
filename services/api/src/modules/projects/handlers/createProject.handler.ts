import type { RouteHandler } from 'fastify'

import type { CreateProjectPayload } from '../schemas/createProjectPayload.schema'

export const handler: RouteHandler<{
  Params: unknown
  Querystring: unknown
  Body: CreateProjectPayload
}> = async function (_, reply) {
  const project = this.projectService.createProject()

  return reply.created(project)
}
