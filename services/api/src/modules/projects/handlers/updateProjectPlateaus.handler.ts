import type { RouteHandler } from 'fastify'
import {
  InvalidProjectPlateausGeometriesException,
  ProjectNotFoundException,
  InvalidProjectLimitPlateausGeometriesBoundariesException,
} from '@platform/domains'

import type { UpdateProjectPlateausParameters } from '../schemas/updateProjectPlateausParameters.schema'
import type { UpdateProjectPlateausPayload } from '../schemas/updateProjectPlateausPayload.schema'

export const handler: RouteHandler<{
  Params: UpdateProjectPlateausParameters
  Body: UpdateProjectPlateausPayload
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
    const projectPlateaus = await this.projectsLimitPlateausService.updatePlateaus(request.params.projectId, {
      geometries: request.body.geometries,
    })

    return reply.ok(projectPlateaus)
  } catch (error) {
    if (error instanceof InvalidProjectPlateausGeometriesException) {
      throw reply.badRequest(InvalidProjectPlateausGeometriesException.message)
    }

    if (error instanceof InvalidProjectLimitPlateausGeometriesBoundariesException) {
      throw reply.badRequest(InvalidProjectLimitPlateausGeometriesBoundariesException.message)
    }

    throw reply.internalServerError()
  }
}
