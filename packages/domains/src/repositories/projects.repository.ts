import { eq, projectsTable } from '@platform/neon'

import { ProjectBaseInsertDto } from '../dtos/project.dto'
import { Project, projectSelect } from '../entities/project.entity'
import { AbstractRepository } from './abstract.repository'

export class ProjectsRepository extends AbstractRepository {
  public async insert(data: ProjectBaseInsertDto): Promise<Project> {
    const [project] = await this.entityManager.insert(projectsTable).values(data).returning(projectSelect)

    if (!project) {
      throw new Error('Failed to insert project')
    }

    return project
  }

  public async find(id: string): Promise<Project | null> {
    const [project] = await this.entityManager
      .select(projectSelect)
      .from(projectsTable)
      .where(eq(projectsTable.id, id))
      .limit(1)

    if (!project) {
      return null
    }

    return project
  }

  public async exists(id: string): Promise<boolean> {
    const project = await this.find(id)

    if (!project) {
      return false
    }

    return true
  }
}
