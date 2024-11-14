import { Static, Type } from '@sinclair/typebox'

export const polygonSchema = Type.Object({
  type: Type.Literal('Polygon'),
  coordinates: Type.Array(Type.Array(Type.Tuple([Type.Number(), Type.Number()]), { minItems: 3 })),
})

export type Polygon = Static<typeof polygonSchema>
