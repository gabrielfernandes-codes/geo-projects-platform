import type { FastifyInstance } from 'fastify'
import type { FastifyEnvOptions } from '@fastify/env'
import FastifyEnvironments from '@fastify/env'
import FastifyPlugin from 'fastify-plugin'

const environmentSchema = {
  type: 'object',
  properties: {
    NODE_ENV: { type: 'string', enum: ['development', 'production'] },
  },
}

export const loadServerEnvironmentsPlugin = FastifyPlugin(async function plugin(
  instance: FastifyInstance
): Promise<void> {
  void instance.register(FastifyEnvironments, {
    confKey: 'config',
    dotenv: true,
    schema: environmentSchema,
  } as FastifyEnvOptions)
})
