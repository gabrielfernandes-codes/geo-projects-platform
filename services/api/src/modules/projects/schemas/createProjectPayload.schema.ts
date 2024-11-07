import { Static, Type } from '@sinclair/typebox'

export const schema = Type.Object({
  name: Type.String({ maxLength: 255 }),
})

export type CreateProjectPayload = Static<typeof schema>
