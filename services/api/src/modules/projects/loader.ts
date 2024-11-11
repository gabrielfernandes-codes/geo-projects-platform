import { DatabaseManager, ProjectsRepository, ProjectsService } from '@platform/domains'
import type { FastifyInstance } from 'fastify'

import { loadHttpDecoratorsPlugin } from '../../plugins/http-decorators.plugin'
import { loadRequestCorsPlugin } from '../../plugins/request-cors.plugin'
import { loadResponseCompressPlugin } from '../../plugins/response-compress.plugin'
import { loadResponseHeadersPlugin } from '../../plugins/response-headers.plugin'

import { basePath, routes } from './routes'

declare module 'fastify' {
  export interface FastifyInstance {
    projectsService: ProjectsService
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

    const projectsRepository = new ProjectsRepository(databaseManager)

    const projectsService = new ProjectsService(projectsRepository)

    void instance.decorate('projectsService', projectsService)
  },
  options: { prefix: basePath },
}
