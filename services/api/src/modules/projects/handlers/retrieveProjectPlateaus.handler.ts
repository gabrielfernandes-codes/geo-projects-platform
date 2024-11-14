import type { RouteHandler } from 'fastify'
import { ProjectNotFoundException } from '@platform/domains'

import type { RetrieveProjectPlateausParameters } from '../schemas/retrieveProjectPlateausParameters.schema'

export const handler: RouteHandler<{
  Params: RetrieveProjectPlateausParameters
}> = async function (request, reply) {
  try {
    await this.projectsService.hasProject(request.params.projectId)
  } catch (error) {
    if (error instanceof ProjectNotFoundException) {
      throw reply.notFound(ProjectNotFoundException.message)
    }

    throw reply.internalServerError()
  }

  try {
    const projectPlateaus = await this.projectsPlateausService.getPlateaus(request.params.projectId)

    return reply.ok(projectPlateaus)
  } catch (error) {
    throw reply.internalServerError()
  }
}
