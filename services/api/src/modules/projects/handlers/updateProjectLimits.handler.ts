import type { RouteHandler } from 'fastify'
import { InvalidProjectLimitsGeometriesException, ProjectNotFoundException } from '@platform/domains'

import type { UpdateProjectLimitsParameters } from '../schemas/updateProjectLimitsParameters.schema'
import type { UpdateProjectLimitsPayload } from '../schemas/updateProjectLimitsPayload.schema'

export const handler: RouteHandler<{
  Params: UpdateProjectLimitsParameters
  Body: UpdateProjectLimitsPayload
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
    const projectLimits = await this.projectsLimitsService.updateLimits(request.params.projectId, {
      geometries: request.body.geometries,
    })

    return reply.ok(projectLimits)
  } catch (error) {
    if (error instanceof InvalidProjectLimitsGeometriesException) {
      throw reply.badRequest(InvalidProjectLimitsGeometriesException.message)
    }

    throw reply.internalServerError()
  }
}
