/*
 * Heavily cribbed from:
 *   https://github.com/processing/p5.js/blob/master/src/math/p5.Vector.js
 *   https://github.com/tmcw/literate-raytracer/blob/gh-pages/vector.js
 */

export default class Vector {
  constructor(x = 0, y = 0, z = 0) {
    this.x = x
    this.y = y
    this.z = z
  }

  static get UP() {
    return new Vector(0.0, 1.0, 0.0)
  }

  static get ZERO() {
    return new Vector(0.0, 0.0, 0.0)
  }

  static dot(a, b) {
    return a.dot(b)
  }

  static cross(a, b) {
    return a.cross(b)
  }

  static mult(a, t) {
    return a.copy().mult(t)
  }

  static div(a, t) {
    return a.copy().div(t)
  }

  static mag(a) {
    return a.mag()
  }

  static normalize(a) {
    return Vector.div(a, a.mag())
  }

  static add(a, b) {
    return a.copy().add(b)
  }

  static sub(a, b) {
    return a.copy().sub(b)
  }

  static dist(a, b) {
    return a.dist(b)
  }

  static lerp(a, b, amount) {
    return a.copy().lerp(b, amount)
  }

  static angleBetween(a, b) {
    return Math.acos(a.dot(b) / (a.mag() * b.mag())) // in radians
  }

  static reflectThrough(a, normal) {
    const d = Vector.mult(normal, Vector.dot(a, normal))
    return Vector.sub(Vector.mult(d, 2), a)
  }

  copy() {
    return new Vector(this.x, this.y, this.z)
  }

  set(x = 0, y = 0, z = 0) {
    if (x instanceof Vector) {
      this.x = x.x || 0
      this.y = x.y || 0
      this.z = x.z || 0
      return this
    }

    this.x = x
    this.y = y
    this.z = z
    return this
  }

  dot(v) {
    return (this.x * (v.x || 0)) + (this.y * (v.y || 0)) + (this.z * (v.z || 0))
  }

  cross(v) {
    return new Vector(
      (this.y * v.z) - (this.z * v.y),
      (this.z * v.x) - (this.x * v.z),
      (this.x * v.y) - (this.y * v.x)
    )
  }

  mult(t = 0) {
    this.x *= t
    this.y *= t
    this.z *= t
    return this
  }

  div(t) {
    this.x /= t
    this.y /= t
    this.z /= t
    return this
  }

  mag() {
    return Math.sqrt(this.dot(this))
  }

  normalize() {
    return this.mag() === 0 ? this : this.div(this.mag())
  }

  add(v) {
    this.x += v.x || 0
    this.y += v.y || 0
    this.z += v.z || 0
    return this
  }

  sub(v) {
    this.x -= v.x || 0
    this.y -= v.y || 0
    this.z -= v.z || 0
    return this
  }

  dist(v) {
    const d = v.copy().sub(this)
    return d.mag()
  }

  equals(v) {
    return this.x === v.x && this.y === v.y && this.z === v.z
  }

  lerp(v, amount) {
    this.x += (v.x - this.x) * amount || 0
    this.y += (v.y - this.y) * amount || 0
    this.z += (v.z - this.z) * amount || 0
    return this
  }

  setMag(n) {
    return this.normalize().mult(n)
  }

  limit(max) {
    const magSq = this.dot(this)
    if (magSq > max * max) {
      this.setMag(max)
    }
    return this
  }

  heading() {
    return Math.atan2(this.y, this.x) // in radians
  }

  rotate(angle) {
    const newHeading = this.heading() + angle
    const mag = this.mag()
    this.x = Math.cos(newHeading) * mag
    this.y = Math.sin(newHeading) * mag
    return this
  }

  toString() {
    return `[${this.x}, ${this.y}, ${this.z}]`
  }

  toArray() {
    return [this.x, this.y, this.z]
  }
}
