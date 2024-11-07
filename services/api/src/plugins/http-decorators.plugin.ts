import type { FastifyInstance, FastifyReply } from 'fastify'

import FastifyHttpDecorators from '@fastify/sensible'
import FastifyPlugin from 'fastify-plugin'

export const loadHttpDecoratorsPlugin = FastifyPlugin(async function plugin(instance: FastifyInstance): Promise<void> {
  void instance.register(FastifyHttpDecorators)

  void instance.decorateReply('ok', function callback(this: FastifyReply, data: unknown) {
    return this.code(200).send(data ? { data } : {})
  })

  void instance.decorateReply('created', function callback(this: FastifyReply, data: unknown) {
    return this.code(201).send(data ? { data } : {})
  })

  void instance.decorateReply('noContent', function callback(this: FastifyReply) {
    return this.code(204).send({})
  })
})
