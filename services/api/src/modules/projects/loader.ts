import {
  DatabaseManager,
  ProjectsLimitPlateausRepository,
  ProjectsLimitPlateausService,
  ProjectsLimitsRepository,
  ProjectsLimitsService,
  ProjectsRepository,
  ProjectsService,
} from '@platform/domains'
import type { FastifyInstance } from 'fastify'

import { loadHttpDecoratorsPlugin } from '../../plugins/http-decorators.plugin'
import { loadRequestCorsPlugin } from '../../plugins/request-cors.plugin'
import { loadResponseCompressPlugin } from '../../plugins/response-compress.plugin'
import { loadResponseHeadersPlugin } from '../../plugins/response-headers.plugin'

import { basePath, routes } from './routes'

declare module 'fastify' {
  export interface FastifyInstance {
    projectsService: ProjectsService
    projectsLimitsService: ProjectsLimitsService
    projectsLimitPlateausService: ProjectsLimitPlateausService
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
    const projectsLimitsRepository = new ProjectsLimitsRepository(databaseManager)
    const projectsLimitPlateausRepository = new ProjectsLimitPlateausRepository(databaseManager)

    const projectsService = new ProjectsService(projectsRepository)
    const projectsLimitsService = new ProjectsLimitsService(projectsLimitsRepository)
    const projectsLimitPlateausService = new ProjectsLimitPlateausService(projectsLimitPlateausRepository)

    void instance.decorate('projectsService', projectsService)
    void instance.decorate('projectsLimitsService', projectsLimitsService)
    void instance.decorate('projectsLimitPlateausService', projectsLimitPlateausService)
  },
  options: { prefix: basePath },
}
