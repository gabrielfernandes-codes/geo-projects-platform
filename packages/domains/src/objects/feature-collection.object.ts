import { Static, Type } from '@sinclair/typebox'

export const featureCollectionSchema = Type.Object(
  {
    type: Type.Literal('FeatureCollection'),
    features: Type.Array(
      Type.Object(
        {
          id: Type.Optional(Type.Any()),
          type: Type.Literal('Feature'),
          geometry: Type.Union([
            Type.Union([
              Type.Object(
                {
                  type: Type.Literal('Point'),
                  coordinates: Type.Tuple([Type.Number(), Type.Number()]),
                },
                { additionalProperties: false }
              ),
              Type.Object(
                {
                  type: Type.Literal('MultiPoint'),
                  coordinates: Type.Array(Type.Tuple([Type.Number(), Type.Number()])),
                },
                { additionalProperties: false }
              ),
              Type.Object(
                {
                  type: Type.Literal('LineString'),
                  coordinates: Type.Array(Type.Tuple([Type.Number(), Type.Number()], { minItems: 2 })),
                },
                { additionalProperties: false }
              ),
              Type.Object(
                {
                  type: Type.Literal('Polygon'),
                  coordinates: Type.Array(Type.Array(Type.Tuple([Type.Number(), Type.Number()], { minItems: 3 }))),
                },
                { additionalProperties: false }
              ),
            ]),
          ]),
          properties: Type.Union([Type.Record(Type.String(), Type.Any()), Type.Null()]),
        },
        { additionalProperties: false }
      )
    ),
  },
  { additionalProperties: false }
)

export type FeatureCollection = Static<typeof featureCollectionSchema>
