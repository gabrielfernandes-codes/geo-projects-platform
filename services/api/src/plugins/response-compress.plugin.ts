import type { FastifyInstance } from 'fastify'
import type { FastifyCompressOptions } from '@fastify/compress'
import FastifyResponseCompress from '@fastify/compress'
import FastifyPlugin from 'fastify-plugin'

export const loadResponseCompressPlugin = FastifyPlugin(async function plugin(
  instance: FastifyInstance
): Promise<void> {
  void instance.register(FastifyResponseCompress, { global: true } satisfies FastifyCompressOptions)
})
