import { Static, Type } from '@sinclair/typebox'

import { polygonSchema } from './polygon.object'

export const featureSchema = Type.Object(
  {
    id: Type.Optional(Type.Any()),
    type: Type.Literal('Feature'),
    geometry: Type.Union([Type.Union([polygonSchema])]),
    properties: Type.Union([Type.Record(Type.String(), Type.Any()), Type.Null()]),
  },
  { additionalProperties: false }
)

export type Feature = Static<typeof featureSchema>
