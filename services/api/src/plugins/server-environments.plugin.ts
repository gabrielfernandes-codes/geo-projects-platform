import type { FastifyInstance } from 'fastify'
import FastifyEnvironments from '@fastify/env'
import FastifyPlugin from 'fastify-plugin'
import { Static, Type } from '@sinclair/typebox'

const schema = Type.Object({
  NODE_ENV: Type.Union([Type.Literal('development'), Type.Literal('production')]),
  POSTGRES_DSN: Type.String(),
})

type Environments = Static<typeof schema>

declare module 'fastify' {
  export interface FastifyInstance {
    envs: Environments
  }
}

declare module '@fastify/env' {
  export interface FastifyEnvOptions {
    confKey?: string
    schema?: typeof schema
  }
}

export const loadServerEnvironmentsPlugin = FastifyPlugin(async function plugin(
  instance: FastifyInstance
): Promise<void> {
  void instance.register(FastifyEnvironments, {
    confKey: 'envs',
    schema,
  })
})
