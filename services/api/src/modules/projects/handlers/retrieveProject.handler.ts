import type { RouteHandler } from 'fastify'

import { RetrieveProjectParameters } from '../schemas/retrieveProjectParameters.schema'
import { ProjectNotFoundException } from '@platform/domains'

export const handler: RouteHandler<{
  Params: RetrieveProjectParameters
}> = async function (request, reply) {
  try {
    const project = await this.projectsService.getProject(request.params.projectId)

    return reply.ok(project)
  } catch (error) {
    if (error instanceof ProjectNotFoundException) {
      throw reply.notFound(ProjectNotFoundException.message)
    }

    console.log(error)

    throw reply.internalServerError()
  }
}
