import { ProjectLimits } from '../entities/project-limit.entity'

export const completeProjectLimitMock: ProjectLimits = {
  geometries: {
    type: 'FeatureCollection',
    features: [
      {
        type: 'Feature',
        properties: {},
        geometry: {
          type: 'Polygon',
          coordinates: [
            [
              [10.757867266534337, 59.91339283457274],
              [10.756516000002959, 59.913633000004204],
              [10.756398999995643, 59.91346700000333],
              [10.75628300000438, 59.91330300000502],
              [10.756052815307351, 59.91297582153187],
              [10.756245682709302, 59.912959479672516],
              [10.757486364709461, 59.91285434826322],
              [10.757867266534337, 59.91339283457274],
            ],
          ],
        },
      },
    ],
  },
}
