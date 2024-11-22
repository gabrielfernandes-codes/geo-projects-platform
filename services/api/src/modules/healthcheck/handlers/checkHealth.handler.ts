import type { RouteHandler } from 'fastify'

export const handler: RouteHandler = async function (_, reply) {
  const health = {
    version: this.envs.VERSION_SHA,
  }

  return reply.ok(health)
}
