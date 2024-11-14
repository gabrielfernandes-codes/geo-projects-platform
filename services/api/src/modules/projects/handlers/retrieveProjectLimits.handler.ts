import type { RouteHandler } from 'fastify'
import { ProjectNotFoundException } from '@platform/domains'

import type { RetrieveProjectLimitsParameters } from '../schemas/retrieveProjectLimitsParameters.schema'

export const handler: RouteHandler<{
  Params: RetrieveProjectLimitsParameters
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
    const projectLimits = await this.projectsLimitsService.getLimits(request.params.projectId)

    return reply.ok(projectLimits)
  } catch (error) {
    throw reply.internalServerError()
  }
}
