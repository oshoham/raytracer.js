import Vector from './vector'
import Ray from './ray'

const defaultScene = {
  camera: {
    point: new Vector(0.0, 0.0, 0.0),
    fieldOfView: 45,
    direction: new Vector(0.0, 3.0, 0.0)
  },
  lights: [],
  objects: []
}

export default class Renderer {
  constructor(canvas, scene = defaultScene) {
    const { width, height } = this.canvas

    this.canvas = canvas
    this.context = canvas.getContext('2d')
    this.data = this.context.getImageData(0, 0, width, height)
    this.scene = scene
    this.isPlaying = false
    this.startTime = null
  }

  render() {
    const { camera, lights, objects } = this.scene
    const { width, height } = this.canvas

    // all the raytracing stuff goes here
    const ray = new Ray(camera.point)

    this.context.putImageData(this.data, 0, 0)
  }

  tick(timestamp) {
    if (!this.startTime) {
      this.startTime = timestamp
    }

    const progress = timestamp - this.startTime

    this.render()

    if (this.isPlaying) {
      requestAnimationFrame(this.tick.bind(this))
    }
  }

  play() {
    this.isPlaying = true
    requestAnimationFrame(this.tick.bind(this))
  }

  stop() {
    this.isPlaying = false
  }
}
