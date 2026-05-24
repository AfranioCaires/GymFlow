export class Coordinate {
  constructor(
    public latitude: number,
    public longitude: number,
  ) {
    if (Math.abs(latitude) > 90 || Math.abs(longitude) > 180) {
      throw new Error('Invalid coordinates')
    }
  }
}
