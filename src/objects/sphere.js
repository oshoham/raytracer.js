import GeometricObject from './geometric-object'
import Vector from '../vector-objects'

export default class Sphere extends GeometricObject {
  constructor({ center, radius, color, material }) {
    super(color, material)
    this.center = center
    this.radius = radius
  }

  calculateIntersection(ray) {
    const eyeToCenter = Vector.sub(this.center, ray.origin)
    const v = Vector.dot(eyeToCenter, ray.direction)
    const eoDot = Vector.dot(eyeToCenter, eyeToCenter)
    const discriminant = (this.radius * this.radius) - eoDot + (v * v)

    if (discriminant < 0) {
      return
    }

    return v - Math.sqrt(discriminant)
  }

  calculateNormal(pos) {
    return Vector.normalize(Vector.sub(pos, this.center))
  }
}
