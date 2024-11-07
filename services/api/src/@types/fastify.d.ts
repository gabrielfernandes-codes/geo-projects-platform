import type { FastifySchema } from 'fastify'
import type { FromSchema, JSONSchema } from 'json-schema-to-ts'

import type { environmentSchema } from '../core/plugins/server-environments-plugin'

declare module 'fastify' {
  export interface FastifyInstance {
    config: FromSchema<typeof environmentSchema>
  }

  export interface FastifyReply {
    noContent: () => FastifyReply
    ok: (data: object | object[]) => FastifyReply
    created: (data: object | object[]) => FastifyReply
    dataConflict: (data: object | object[]) => FastifyReply
  }
}
