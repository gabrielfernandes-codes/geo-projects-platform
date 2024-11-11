import type { RouteHandler } from 'fastify'

import type { CreateProjectPayload } from '../schemas/createProjectPayload.schema'

export const handler: RouteHandler<{
  Body: CreateProjectPayload
}> = async function (request, reply) {
  try {
    const project = await this.projectsService.createProject({
      name: request.body.name,
    })

    return reply.created(project)
  } catch (error) {
    throw reply.internalServerError()
  }
}
