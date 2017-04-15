// # Vector Operations
//
// These are general-purpose functions that deal with vectors - in this case,
// three-dimensional vectors represented as objects in the form
//
//     { x, y, z }
//
// Since we're not using traditional object oriented techniques, these
// functions take and return that sort of logic-less object, so you'll see
// `add(a, b)` rather than `a.add(b)`.
//
// Heavily cribbed from:
//   https://github.com/processing/p5.js/blob/master/src/math/p5.Vector.js
//   https://github.com/tmcw/literate-raytracer/blob/gh-pages/vector.js

const Vector = {}

// # Constants
Vector.UP = { x: 0.0, y: 1.0, z: 0.0 }
Vector.ZERO = { x: 0.0, y: 0.0, z: 0.0 }
Vector.WHITE = { x: 255, y: 255, z: 255 }

Vector.new = function(x = 0, y = 0, z = 0) {
  return { x: x, y: y, z: z }
}

Vector.copy = function(a) {
  return { x: a.x, y: a.y, z: a.z }
}

Vector.dot = function(a, b) {
  return (a.x * b.x) + (a.y * b.y) + (a.z * b.z)
}

Vector.cross = function(a, b) {
  return {
    x: (a.y * b.z) - (a.z * b.y),
    y: (a.z * b.x) - (a.x * b.z),
    z: (a.x * b.y) - (a.y * b.x)
  }
}

Vector.mult = function(a, t) {
  return {
    x: a.x * t,
    y: a.y * t,
    z: a.z * t
  }
}

Vector.div = function(a, t) {
  return {
    x: a.x / t,
    y: a.y / t,
    z: a.z / t
  }
}

Vector.normalize = function(a) {
  const mag = Vector.mag(a)
  return mag === 0 ? a : Vector.div(a, mag)
}

// Add two vectors to each other, by simply combining each
// of their components
Vector.add = function(a, b) {
  return {
    x: a.x + b.x,
    y: a.y + b.y,
    z: a.z + b.z
  }
}

// A version of `add` that adds three vectors at the same time. While
// it's possible to write a clever version of `Vector.add` that takes
// any number of arguments, it's not fast, so we're keeping it simple and
// just making two versions.
Vector.add3 = function(a, b, c) {
  return {
    x: a.x + b.x + c.x,
    y: a.y + b.y + c.y,
    z: a.z + b.z + c.z
  }
}

// Subtract one vector from another, by subtracting each component
Vector.sub = function(a, b) {
  return {
    x: a.x - b.x,
    y: a.y - b.y,
    z: a.z - b.z
  }
}

// Length, or magnitude, measured by [Euclidean norm](https://en.wikipedia.org/wiki/Euclidean_vector#Length)
Vector.mag = function(a) {
  return Math.sqrt(Vector.dot(a, a))
}

Vector.angleBetween = function(a, b) {
  return Math.acos(Vector.dot(a, b) / (Vector.mag(a) * Vector.mag(b))) // in radians
}

// Given a vector `a`, which is a point in space, and a `normal`, which is
// the angle the point hits a surface, returna  new vector that is reflect
// off of that surface
Vector.reflectThrough = function(a, normal) {
  const d = Vector.mult(normal, Vector.dot(a, normal))
  return Vector.sub(Vector.mult(d, 2), a)
}

Vector.dist = function(a, b) {
  const d = Vector.sub(b, a)
  return Vector.mag(d)
}

Vector.equal = function(a, b) {
  return a.x === b.x && a.y === b.y && a.z === b.z
}

Vector.lerp = function(a, b, amount) {
  return {
    x: a.x + (b.x - a.x) * amount || 0,
    y: a.y + (b.y - a.y) * amount || 0,
    z: a.z + (b.z - a.z) * amount || 0
  }
}

Vector.setMag = function(a, n) {
  return Vector.mult(Vector.normalize(a), n)
}

Vector.limit = function(a, max) {
  const magSq = Vector.dot(a, a)
  if (magSq > max * max) {
    return Vector.setMag(a, max)
  } else {
    return a
  }
}

Vector.heading = function(a) {
  return Math.atan2(a.y, a.x) // in radians
}

Vector.rotate = function(a, angle) {
  const newHeading = Vector.heading(a) + angle
  const mag = Vector.mag(a)
  return {
    x: Math.cos(newHeading) * mag,
    y: Math.sin(newHeading) * mag,
    z: a.z
  }
}

Vector.toString = function(a) {
  return `[${a.x}, ${a.y}, ${a.z}]`
}

Vector.toArray = function(a) {
  return [a.x, a.y, a.z]
}

export default Vector
