import { Static, Type } from '@sinclair/typebox'

export const schema = Type.Object(
  {
    name: Type.String({ maxLength: 255 }),
  },
  { additionalProperties: false }
)

export type CreateProjectPayload = Static<typeof schema>
