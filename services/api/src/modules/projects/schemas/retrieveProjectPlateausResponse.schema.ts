import { featureCollectionSchema } from '@platform/domains'
import { Static, Type } from '@sinclair/typebox'

export const schema = Type.Object({
  data: Type.Object({
    collection: featureCollectionSchema,
  }),
})

export type RetrieveProjectPlateausResponse = Static<typeof schema>
