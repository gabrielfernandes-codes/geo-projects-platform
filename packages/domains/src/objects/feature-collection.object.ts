import { Static, Type } from '@sinclair/typebox'

export const featureCollectionSchema = Type.Object({
  type: Type.Literal('FeatureCollection'),
  features: Type.Array(
    Type.Object({
      id: Type.Optional(Type.Any()),
      type: Type.Literal('Feature'),
      geometry: Type.Union([
        Type.Union([
          Type.Object({
            type: Type.Literal('Point'),
            coordinates: Type.Tuple([Type.Number(), Type.Number()]),
          }),
          Type.Object({
            type: Type.Literal('MultiPoint'),
            coordinates: Type.Array(Type.Tuple([Type.Number(), Type.Number()])),
          }),
          Type.Object({
            type: Type.Literal('LineString'),
            coordinates: Type.Array(Type.Tuple([Type.Number(), Type.Number()], { minItems: 2 })),
          }),
          Type.Object({
            type: Type.Literal('Polygon'),
            coordinates: Type.Array(Type.Array(Type.Tuple([Type.Number(), Type.Number()], { minItems: 4 }))),
          }),
        ]),
        Type.Null(),
      ]),
      properties: Type.Optional(Type.Record(Type.String(), Type.Any())),
    })
  ),
})

export type FeatureCollection = Static<typeof featureCollectionSchema>
