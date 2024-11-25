import { Static, Type } from '@sinclair/typebox'

import { featureSchema } from './feature.object'

export const featureCollectionSchema = Type.Object(
  {
    type: Type.Literal('FeatureCollection'),
    features: Type.Array(featureSchema),
  },
  { additionalProperties: false }
)

export type FeatureCollection = Static<typeof featureCollectionSchema>
