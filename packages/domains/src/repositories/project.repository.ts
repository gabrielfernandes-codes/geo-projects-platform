import { eq, projectsTable } from '@platform/neon'

import { ProjectBaseInsertDto } from '../dtos/project.dto'
import { Project } from '../entities/project.entity'
import { AbstractRepository } from './abstract.repository'

export class ProjectRepository extends AbstractRepository {
  public async insertProject(data: ProjectBaseInsertDto): Promise<Project> {
    const project = await this.entityManager.insert(projectsTable).values(data).returning()

    if (!project?.length) {
      throw new Error('Failed to insert project')
    }

    return project[0]
  }

  public async findProject(id: string): Promise<Project | null> {
    const project = await this.entityManager.select().from(projectsTable).where(eq(projectsTable.id, id)).limit(1)

    if (!project?.length) {
      return null
    }

    return project[0]
  }
}
