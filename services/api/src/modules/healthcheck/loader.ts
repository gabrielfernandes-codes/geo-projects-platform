import type { FastifyInstance } from 'fastify'

import { loadHttpDecoratorsPlugin } from '../../plugins/http-decorators.plugin'
import { loadRequestCorsPlugin } from '../../plugins/request-cors.plugin'
import { loadResponseCompressPlugin } from '../../plugins/response-compress.plugin'
import { loadResponseHeadersPlugin } from '../../plugins/response-headers.plugin'

import { basePath, routes } from './routes'

export const module = {
  callback: (instance: FastifyInstance) => {
    void instance.register(loadResponseCompressPlugin)
    void instance.register(loadRequestCorsPlugin)
    void instance.register(loadHttpDecoratorsPlugin)
    void instance.register(loadResponseHeadersPlugin)
    void instance.register(routes)
  },
  options: { prefix: basePath },
}
