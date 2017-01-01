import GeometricObject from './geometric-object'

export default class Sphere extends GeometricObject {
  constructor({ center, radius, color, material }) {
    super(color, material)
    this.center = center
    this.radius = radius
  }
}
