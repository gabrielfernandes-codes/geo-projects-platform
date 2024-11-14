import { projectTableColumns, InferModelFromColumns } from '@platform/neon'

export const projectSelect = {
  id: projectTableColumns.id,
  name: projectTableColumns.name,
}

export type Project = InferModelFromColumns<typeof projectSelect>
