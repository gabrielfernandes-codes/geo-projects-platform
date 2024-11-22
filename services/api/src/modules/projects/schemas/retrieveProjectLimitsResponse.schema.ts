import { featureCollectionSchema } from '@platform/domains'
import { Static, Type } from '@sinclair/typebox'

export const schema = Type.Object(
  {
    data: Type.Object(
      {
        geometries: featureCollectionSchema,
      },
      { additionalProperties: false }
    ),
  },
  { additionalProperties: false }
)

export type RetrieveProjectLimitsResponse = Static<typeof schema>
