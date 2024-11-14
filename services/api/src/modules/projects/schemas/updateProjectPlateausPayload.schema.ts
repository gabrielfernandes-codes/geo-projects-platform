import { featureCollectionSchema } from '@platform/domains'
import { Static, Type } from '@sinclair/typebox'

export const schema = Type.Object({
  collection: featureCollectionSchema,
})

export type UpdateProjectPlateausPayload = Static<typeof schema>
