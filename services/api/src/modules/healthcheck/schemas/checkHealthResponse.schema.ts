import { Static, Type } from '@sinclair/typebox'

export const schema = Type.Object(
  {
    data: Type.Object(
      {
        version: Type.String(),
      },
      { additionalProperties: false }
    ),
  },
  { additionalProperties: false }
)

export type CheckHealthResponse = Static<typeof schema>
