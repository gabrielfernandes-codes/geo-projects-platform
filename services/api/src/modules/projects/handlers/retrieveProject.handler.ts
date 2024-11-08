import type { RouteHandler } from 'fastify'

export const handler: RouteHandler<{
  Params: unknown
}> = async function (_, reply) {
  const project = this.projectService.getProject()

  return reply.ok(project)
}
