import Vector from '../vector'

function sphereIntersection(sphere, ray) {
  const eyeToCenter = Vector.sub(sphere.center, ray.origin)
  const v = Vector.dot(eyeToCenter, ray.direction)
  const eoDot = Vector.dot(eyeToCenter, eyeToCenter)
  const discriminant = (sphere.radius * sphere.radius) - eoDot + (v * v)

  if (discriminant < 0) {
    return
  }

  return v - Math.sqrt(discriminant)
}

function sphereNormal(sphere, pos) {
  return Vector.normalize(Vector.sub(pos, sphere.center))
}

export {
  sphereIntersection,
  sphereNormal
}

