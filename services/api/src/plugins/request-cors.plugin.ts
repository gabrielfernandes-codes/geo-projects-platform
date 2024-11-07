import type { FastifyInstance } from 'fastify'
import FastifyRequestCors from '@fastify/cors'
import FastifyPlugin from 'fastify-plugin'

export const loadRequestCorsPlugin = FastifyPlugin(async function plugin(instance: FastifyInstance): Promise<void> {
  void instance.register(FastifyRequestCors)
})
