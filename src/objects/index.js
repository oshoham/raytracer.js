import { sphereIntersection, sphereNormal } from './sphere'

function calculateIntersection(object, ray) {
  if (!object.type) {
    throw new Error('Object has no type.')
  }

  switch(object.type) {
    case 'sphere':
      return sphereIntersection(object, ray)
    default:
      throw new Error('Invalid object type.')
  }
}

function calculateNormal(object, pos) {
  if (!object.type) {
    throw new Error('Object has no type.')
  }

  switch(object.type) {
    case 'sphere':
      return sphereNormal(object, pos)
    default:
      throw new Error('Invalid object type.')
  }
}

export {
  calculateIntersection,
  calculateNormal
}
