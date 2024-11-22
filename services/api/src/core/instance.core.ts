import { FastifyInstance } from 'fastify'
import Fastify from 'fastify'

import { loadHttpSchemaPlugin } from '../plugins/http-schema.plugin'
import { loadServerEnvironmentsPlugin } from '../plugins/server-environments.plugin'

export async function createInstance(
  modules: {
    callback: (instance: FastifyInstance) => void
    options: {
      prefix: string
    }
  }[]
): Promise<FastifyInstance> {
  const instance = Fastify({
    logger: {
      level: process.env.LOG_LEVEL || 'silent',
    },
  })

  await instance.register(loadHttpSchemaPlugin)
  await instance.register(loadServerEnvironmentsPlugin)

  await instance.after()

  modules.forEach((plugin) => void instance.register(plugin.callback, plugin.options || {}))

  await instance.ready()

  return instance
}
