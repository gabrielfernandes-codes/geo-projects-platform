import { ProjectPlateaus } from '../entities/project-plateau.entity'

export const completeProjectPlateausMock: ProjectPlateaus = {
  geometries: {
    type: 'FeatureCollection',
    features: [
      {
        type: 'Feature',
        geometry: {
          type: 'Polygon',
          coordinates: [
            [
              [10.75678086443506, 59.91291413160555],
              [10.757486364709461, 59.91285434826322],
              [10.757867266534337, 59.91339283457274],
              [10.757212164399775, 59.91350927037677],
              [10.75678086443506, 59.91291413160555],
            ],
          ],
        },
        properties: { elevation: 3.63 },
      },
      {
        type: 'Feature',
        geometry: {
          type: 'Polygon',
          coordinates: [
            [
              [10.756996990155885, 59.91321236033006],
              [10.757212164399775, 59.91350927037677],
              [10.756516000002959, 59.913633000004204],
              [10.756398999995643, 59.91346700000333],
              [10.756312148500106, 59.91334421011477],
              [10.756996990155885, 59.91321236033006],
            ],
          ],
        },
        properties: { elevation: 4.63 },
      },
      {
        type: 'Feature',
        geometry: {
          type: 'Polygon',
          coordinates: [
            [
              [10.756312148500106, 59.91334421011477],
              [10.75628300000438, 59.91330300000502],
              [10.756052815307351, 59.91297582153187],
              [10.756245682709302, 59.912959479672516],
              [10.75678086443506, 59.91291413160555],
              [10.756996990155885, 59.91321236033006],
              [10.756312148500106, 59.91334421011477],
            ],
          ],
        },
        properties: { elevation: 2.63 },
      },
    ],
  },
}
