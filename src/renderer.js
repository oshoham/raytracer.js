import Vector from './vector'
import Ray from './ray'

const DEFAULT_SCENE = {
  camera: {
    point: new Vector(0.0, 0.0, 0.0),
    fieldOfView: 45,
    direction: new Vector(0.0, 0.0, 0.0)
  },
  lights: [],
  objects: []
}

export default class Renderer {
  constructor(canvas, generateSceneCallback = () => DEFAULT_SCENE) {
    const { width, height } = this.canvas

    this.canvas = canvas
    this.context = canvas.getContext('2d')
    this.data = this.context.getImageData(0, 0, width, height)
    this.generateScene = generateSceneCallback
    this.isPlaying = false
    this.startTime = null
  }

  render(scene) {
    const { camera, lights, objects } = scene
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
    const scene = this.generateScene(progress)

    this.render(scene)

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
