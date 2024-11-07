import type { FastifyInstance } from 'fastify'
import FastifyHttpSchema from '@fastify/swagger'
import FastifyHttpSchemaDocumentation from '@fastify/swagger-ui'
import FastifyPlugin from 'fastify-plugin'

export const loadHttpSchemaPlugin = FastifyPlugin(async function plugin(instance: FastifyInstance): Promise<void> {
  void instance.register(FastifyHttpSchema, {
    openapi: {
      info: {
        title: 'OpenAPI',
        version: '0.0.0',
      },
      openapi: '3.0.3',
    },
  })

  void instance.register(FastifyHttpSchemaDocumentation, {
    routePrefix: '/docs',
    uiConfig: {
      docExpansion: 'full',
      deepLinking: false,
    },
    staticCSP: true,
  })
})
