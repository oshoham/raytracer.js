import Vector from './vector'

export default class Renderer {
  constructor(canvas, generateSceneCallback, { traceDepthLimit=3, enableSampling=false, numSamples=9 } = {}) {
    const { width, height } = canvas

    this.canvas = canvas
    this.context = canvas.getContext('2d')
    this.data = this.context.getImageData(0, 0, width, height)
    this.generateScene = generateSceneCallback
    this.traceDepthLimit = traceDepthLimit
    this.enableSampling = enableSampling
    this.numSamples = numSamples
    this.isPlaying = false
    this.time = 1
  }

  render(scene) {
    const camera = scene.camera
    const { width, height } = this.canvas
    const data = this.data

    // all the raytracing stuff goes here

    const eyeVector = Vector.normalize(Vector.sub(camera.direction, camera.point)) // w (reversed?)
    const vpRight = Vector.normalize(Vector.cross(eyeVector, Vector.UP)) // u
    const vpUp = Vector.normalize(Vector.cross(vpRight, eyeVector)) // v

    const fovRadians = Math.PI * (camera.fieldOfView / 2) / 180
    const heightWidthRatio = height / width
    const halfWidth = Math.tan(fovRadians)
    const halfHeight = heightWidthRatio * halfWidth
    const cameraWidth = halfWidth * 2
    const cameraHeight = halfHeight * 2
    const pixelWidth = cameraWidth / (width - 1)
    const pixelHeight = cameraHeight / (height - 1)

    const ray = { origin: camera.point, direction: Vector.new() }

    for (let x = 0; x < width; x++) {
      for (let y = 0; y < height; y++) {
        let color = Vector.copy(Vector.ZERO)

        if (this.enableSampling) {
          const n = Math.sqrt(this.numSamples)

          for (let p = 0; p < n; p++) {
            for (let q = 0; q < n; q++) {
              // turn the raw pixel x and y values into values from -1 to 1
              // and use these values to scale the facing-right and facing-up
              // vectors so that we generate versions of the `eyeVector` that are
              // skewed in each necessary direction.
              const xv = pixelWidth * (x - halfWidth + (q + Math.random()) / n) - halfWidth
              const yv = pixelHeight * (y - halfHeight + (p + Math.random()) / n) - halfHeight
              const xComp = Vector.mult(vpRight, xv)
              const yComp = Vector.mult(vpUp, yv)

              ray.direction = Vector.normalize(Vector.add3(xComp, yComp, eyeVector))

              color = Vector.add(color, this.trace(ray, scene, 0))
            }
          }

          color = Vector.div(color, this.numSamples)

        } else {
          const xv = pixelWidth * (x - halfWidth) - halfWidth
          const yv = pixelHeight * (y - halfHeight) - halfHeight
          const xComp = Vector.mult(vpRight, xv)
          const yComp = Vector.mult(vpUp, yv)

          ray.direction = Vector.normalize(Vector.add3(xComp, yComp, eyeVector))
          color = this.trace(ray, scene, 0)
        }

        const index = (x * 4) + (y * width * 4)
        data.data[index + 0] = color.x
        data.data[index + 1] = color.y
        data.data[index + 2] = color.z
        data.data[index + 3] = 255
      }
    }

    this.context.putImageData(data, 0, 0)
  }

  trace(ray, scene, depth) {
    if (depth > this.traceDepthLimit) {
      return
    }

    const [dist, object] = this.intersectScene(ray, scene)

    if (dist === Infinity) {
      return Vector.copy(Vector.WHITE)
    }

    // The pointAtTime is another way of saying the 'intersection point'
    // of this ray into this object. We compute this by simply taking
    // the direction of the ray and making it as long as the distance
    // returned by the intersection check.
    const pointAtTime = Vector.add(Vector.mult(ray.direction, dist), ray.origin)

    return this.surface(ray, scene, object, pointAtTime, object.calculateNormal(pointAtTime), depth)
  }

  intersectScene(ray, scene) {
    return scene.objects.reduce(function(closest, object) {
      const dist = object.calculateIntersection(ray)
      return dist !== undefined && dist < closest[0] ? [dist, object] : closest
    }, [Infinity, null])
  }

  surface(ray, scene, object, pointAtTime, normal, depth) {
    let color = Vector.copy(Vector.ZERO)
    let lambertAmount = 0

    if (object.material.lambert) {
      for (let i = 0; i < scene.lights.length; i++) {
        const lightPoint = scene.lights[i]

        // First: can we see the light? If not, this is a shadowy area
        // and it gets no light from the lambert shading process.
        if (!this.isLightVisible(pointAtTime, scene, lightPoint)) {
          continue
        }
        // Otherwise, calculate the lambertian reflectance, which
        // essentially is a 'diffuse' lighting system - direct light
        // is bright, and from there, less direct light is gradually,
        // beautifully, less light.
        const contribution = Vector.dot(Vector.normalize(Vector.sub(lightPoint, pointAtTime)), normal)
        // sometimes this formula can return negatives, so we check:
        // we only want positive values for lighting.
        if (contribution > 0) {
          lambertAmount += contribution
        }
      }
    }

    if (object.material.specular) {
      // This is basically the same thing as what we did in render(), just
      // instead of looking from the viewpoint of the camera, we're looking
      // from a point on the surface of a shiny object, seeing what it sees
      // and making that part of a reflection.
      const reflectedRay = { origin: pointAtTime, direction: Vector.reflectThrough(ray.direction, normal) }
      const reflectedColor = this.trace(reflectedRay, scene, depth + 1)
      if (reflectedColor) {
        color = Vector.add(color, Vector.mult(reflectedColor, object.material.specular))
      }
    }

    // lambert should never 'blow out' the lighting of an object,
    // even if the ray bounces between a lot of things and hits lights
    lambertAmount = Math.min(1, lambertAmount)

    // Ambient colors shine bright regardless of whether there's a light visible -
    // a circle with a totally ambient blue color will always just be a flat blue
    // circle.
    color = Vector.add(color, Vector.mult(object.color, lambertAmount * object.material.lambert))
    color = Vector.add(color, Vector.mult(object.color, object.material.ambient))
    return color
  }

  isLightVisible(point, scene, light) {
    const ray = { origin: point, direction: Vector.normalize(Vector.sub(point, light)) }
    const [dist] = this.intersectScene(ray, scene)
    return dist > -0.005
  }

  tick() {
    const scene = this.generateScene(this.time)
    this.time++

    this.render(scene)

    if (this.isPlaying) {
      requestAnimationFrame(this.tick.bind(this))
    }
  }

  play() {
    if (this.isPlaying) {
      return
    }
    this.isPlaying = true
    requestAnimationFrame(this.tick.bind(this))
  }

  stop() {
    this.isPlaying = false
  }
}
