import Vector from './vector'

export default class Ray {
  constructor(origin = new Vector(0, 0, 0), direction = new Vector(0, 0, 1.0)) {
    if (origin instanceof Ray) {
      origin = origin.origin
      direction = origin.direction
    }
    this.origin = origin
    this.direction = direction
  }

  set(r) {
    this.origin = r.origin,
    this.direction = r.direction
  }
}
