import { Static, Type } from '@sinclair/typebox'

export const schema = Type.Object(
  {
    projectId: Type.String({ format: 'uuid' }),
  },
  { additionalProperties: false }
)

export type RetrieveProjectLimitsParameters = Static<typeof schema>
