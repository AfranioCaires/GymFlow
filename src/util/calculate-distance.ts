export type Coordinate = {
  latitude: number
  longitude: number
}

export function getDistanceBetweenCoordinates(from: Coordinate, to: Coordinate) {
  const DEGREES_TO_RADIANS = Math.PI / 180
  const NAUTICAL_MILES_PER_DEGREE = 60
  const STATUTE_MILES_PER_NAUTICAL_MILE = 1.1515
  const KILOMETERS_PER_MILE = 1.609344

  if (from.latitude === to.latitude && from.longitude === to.longitude) {
    return 0
  }

  const fromRadian = (Math.PI * from.latitude) / 180
  const toRadian = (Math.PI * to.latitude) / 180

  const theta = from.longitude - to.longitude
  const radTheta = (Math.PI * theta) / 180

  let dist =
    Math.sin(fromRadian) * Math.sin(toRadian) +
    Math.cos(fromRadian) * Math.cos(toRadian) * Math.cos(radTheta)

  if (dist > 1) {
    dist = 1
  }

  dist = Math.acos(dist)
  dist = dist / DEGREES_TO_RADIANS
  dist = dist * NAUTICAL_MILES_PER_DEGREE * STATUTE_MILES_PER_NAUTICAL_MILE
  dist = dist * KILOMETERS_PER_MILE

  return dist
}
