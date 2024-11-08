import type { FastifyReply, FastifyRequest } from 'fastify'

export async function isAuthorized(request: FastifyRequest, reply: FastifyReply): Promise<void> {
  if (!request.headers.authorization) {
    throw reply.unauthorized()
  }
}
