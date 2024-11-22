import { featureCollectionSchema } from '@platform/domains'
import { Static, Type } from '@sinclair/typebox'

export const schema = Type.Object(
  {
    geometries: featureCollectionSchema,
  },
  { additionalProperties: false }
)

export type UpdateProjectLimitsPayload = Static<typeof schema>
