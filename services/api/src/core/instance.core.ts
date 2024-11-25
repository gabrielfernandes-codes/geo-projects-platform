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
      level: process.env.LOG_LEVEL ?? (process.env.NODE_ENV !== 'production' ? 'info' : 'silent'),
      transport:
        process.env.LOG_LEVEL && process.env.LOG_LEVEL !== 'silent'
          ? {
              target: 'pino-pretty',
              options: {
                translateTime: 'HH:MM:ss Z',
                ignore: 'pid,hostname',
              },
            }
          : undefined,
    },
  })

  await instance.register(loadHttpSchemaPlugin)
  await instance.register(loadServerEnvironmentsPlugin)

  await instance.after()

  modules.forEach((plugin) => void instance.register(plugin.callback, plugin.options || {}))

  await instance.ready()

  return instance
}
