import {
  area,
  booleanEqual,
  booleanValid,
  cleanCoords,
  clone,
  featureCollection as createFeatureCollection,
  point as createPoint,
  kinks,
  rewind,
  simplify,
  unkinkPolygon,
} from '@turf/turf'

import { FeatureCollection } from '../objects/feature-collection.object'
import { Feature } from '../objects/feature.object'

export function arePolygonsValid(featureCollection: FeatureCollection): boolean {
  return featureCollection.features.every((feature) => {
    if (!feature.geometry || feature.geometry.type !== 'Polygon') {
      return true
    }

    for (const ring of feature.geometry.coordinates) {
      const validCoordinates = ring.filter(([lon, lat]) => lon >= -180 && lon <= 180 && lat >= -90 && lat <= 90)

      if (validCoordinates.length < 4) {
        return false
      }

      const firstCoordinate = ring[0]
      const lastCoordinate = ring[ring.length - 1]

      if (!booleanEqual(createPoint(firstCoordinate), createPoint(lastCoordinate))) {
        return false
      }
    }

    return booleanValid(feature.geometry)
  })
}

export function fixPolygonsClosure(featureCollection: FeatureCollection): FeatureCollection {
  featureCollection.features = featureCollection.features.map((feature) => {
    if (!feature.geometry || feature.geometry.type !== 'Polygon') {
      return feature
    }

    feature.geometry.coordinates = feature.geometry.coordinates.map((ring) => {
      if (ring.length === 0) {
        throw new Error('Ring has no coordinates.')
      }

      const firstCoord = ring[0]
      const lastCoord = ring[ring.length - 1]

      if (!booleanEqual(createPoint(firstCoord), createPoint(lastCoord))) {
        ring.push(firstCoord)
      }

      return ring
    })

    return feature
  })

  return featureCollection
}

export function removeDuplicateCoordinates(featureCollection: FeatureCollection): FeatureCollection {
  featureCollection.features = featureCollection.features.map((feature) => {
    if (!feature.geometry || feature.geometry.type !== 'Polygon') {
      return feature
    }

    feature.geometry = cleanCoords(feature.geometry)

    return feature
  })

  return featureCollection
}

export function fixSelfIntersections(featureCollection: FeatureCollection): FeatureCollection {
  const fixedFeatures: Feature[] = []

  featureCollection.features.forEach((feature) => {
    if (!feature.geometry || feature.geometry.type !== 'Polygon') {
      fixedFeatures.push(feature)

      return
    }

    const kinksResult = kinks(feature.geometry)

    if (kinksResult.features.length === 0) {
      fixedFeatures.push(feature)

      return
    }

    const unkinked = unkinkPolygon(feature.geometry) as FeatureCollection

    if (unkinked.features.length === 0) {
      throw new Error('Cannot fix self-intersections.')
    }

    unkinked.features.forEach((unkinkedFeature) => {
      unkinkedFeature.properties = feature.properties

      fixedFeatures.push(unkinkedFeature)
    })
  })

  return createFeatureCollection(fixedFeatures)
}

export function fixWindingOrder(featureCollection: FeatureCollection): FeatureCollection {
  return rewind<typeof featureCollection>(featureCollection, { reverse: true, mutate: true }) as FeatureCollection
}

export function simplifyPolygons(featureCollection: FeatureCollection, tolerance = 0.001): FeatureCollection {
  featureCollection.features = featureCollection.features.map((feature) => {
    if (!feature.geometry || feature.geometry.type !== 'Polygon') {
      return feature
    }

    const simplifiedGeometry = simplify(feature.geometry, { tolerance, highQuality: true })

    if (!simplifiedGeometry || simplifiedGeometry.coordinates.length === 0) {
      throw new Error('Invalid polygon after simplification.')
    }

    const simplifiedFeature = clone(feature)

    simplifiedFeature.geometry = simplifiedGeometry

    return simplifiedFeature
  })

  return featureCollection
}

export function removeSmallPolygons(featureCollection: FeatureCollection, minArea = 1): FeatureCollection {
  featureCollection.features = featureCollection.features.filter((feature) => {
    if (!feature.geometry || feature.geometry.type !== 'Polygon') {
      return true
    }

    return area(feature.geometry) >= minArea
  })

  if (featureCollection.features.length === 0) {
    throw new Error('All polygons were removed due to small area.')
  }

  return featureCollection
}
