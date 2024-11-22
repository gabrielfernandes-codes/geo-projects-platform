import type { FastifyReply, FastifyRequest } from 'fastify'
import { Type } from '@sinclair/typebox'

export const authorizationHeaderSchema = Type.Object({
  Authorization: Type.String({
    pattern: '^Bearer\\s.+$',
  }),
})

export async function isAuthorized(request: FastifyRequest, reply: FastifyReply): Promise<void> {
  if (!request.headers.authorization) {
    throw reply.unauthorized()
  }
}
