import { Static, Type } from '@sinclair/typebox'

export const schema = Type.Object({
  data: Type.Object({
    id: Type.String({ format: 'uuid' }),
    name: Type.String({ maxLength: 255 }),
  }),
})

export type RetrieveProjectResponse = Static<typeof schema>
