import type { FastifyInstance } from 'fastify'
import FastifyResponseHeaders from '@fastify/helmet'
import FastifyPlugin from 'fastify-plugin'

export const loadResponseHeadersPlugin = FastifyPlugin(async function plugin(instance: FastifyInstance): Promise<void> {
  void instance.register(FastifyResponseHeaders)
})
