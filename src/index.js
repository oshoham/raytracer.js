import Vector from './vector'
import { Sphere } from './objects'
import Renderer from './renderer'

const canvas = document.getElementById('canvas')
const width = 640 * 0.5
const height = 480 * 0.5

canvas.width = width
canvas.height = height
canvas.style.cssText = `width:${(width * 2)}px;height:${(height * 2)}px`

function generateScene(progress) {
  const scene = {
    camera: {
      point: Vector.new(0.0, 1.8, 10),
      fieldOfView: 45,
      direction: Vector.new(0.0, 3.0, 0.0)
    },
    lights: [Vector.new(-30, -10, 20)],
    objects: [
      new Sphere({
        center: Vector.new(0, 3.5, -3),
        radius: 3,
        color: Vector.new(155, 200, 155),
        material: {
          specular: 0.2,
          lambert: 0.7,
          ambient: 0.1
        }
      }),
      new Sphere({
        center: Vector.new(Math.sin(progress * 0.1) * 3.5, 2, -3 + (Math.cos(progress * 0.1) * 3.5)),
        radius: 0.2,
        color: Vector.new(155, 155, 155),
        material: {
          specular: 0.1,
          lambert: 0.9,
          ambient: 0.0
        }
      }),
      new Sphere({
        center: Vector.new(Math.sin(progress * 0.2) * 4, 3, -3 + (Math.cos(progress * 0.2) * 4)),
        radius: 0.1,
        color: Vector.new(255, 255, 255),
        material: {
          specular: 0.2,
          lambert: 0.7,
          ambient: 0.1
        }
      })
    ]
  }

  return scene
}

const renderer = new Renderer(canvas, generateScene, { enableSampling: false })

renderer.tick()

document.getElementById('play').onclick = renderer.play.bind(renderer)
document.getElementById('stop').onclick = renderer.stop.bind(renderer)
