import type { FastifyInstance } from 'fastify'

import { loadHttpDecoratorsPlugin } from '../../plugins/http-decorators.plugin'
import { loadRequestCorsPlugin } from '../../plugins/request-cors.plugin'
import { loadResponseCompressPlugin } from '../../plugins/response-compress.plugin'
import { loadResponseHeadersPlugin } from '../../plugins/response-headers.plugin'

import { DatabaseManager, ProjectRepository, ProjectService } from '@platform/domains'
import { basePath, routes } from './routes'

declare module 'fastify' {
  export interface FastifyInstance {
    projectService: ProjectService
  }
}

export const module = {
  callback: (instance: FastifyInstance) => {
    void instance.register(loadResponseCompressPlugin)
    void instance.register(loadRequestCorsPlugin)
    void instance.register(loadHttpDecoratorsPlugin)
    void instance.register(loadResponseHeadersPlugin)
    void instance.register(routes)

    const databaseManager = new DatabaseManager(instance.envs.POSTGRES_DSN)

    const projectRepository = new ProjectRepository(databaseManager)
    const projectService = new ProjectService(projectRepository)

    void instance.decorate('projectService', projectService)
  },
  options: { prefix: basePath },
}
