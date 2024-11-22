import { Static, Type } from '@sinclair/typebox'

export const schema = Type.Object(
  {
    projectId: Type.String({ format: 'uuid' }),
  },
  { additionalProperties: false }
)

export type RetrieveProjectPlateausParameters = Static<typeof schema>
