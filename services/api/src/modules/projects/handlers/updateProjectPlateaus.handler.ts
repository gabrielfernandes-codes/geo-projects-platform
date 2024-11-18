import type { RouteHandler } from 'fastify'
import { ProjectNotFoundException } from '@platform/domains'

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
    const projectPlateaus = await this.projectsPlateausService.updatePlateaus(request.params.projectId, {
      geometries: request.body.geometries,
    })

    return reply.ok(projectPlateaus)
  } catch (error) {
    throw reply.internalServerError()
  }
}
