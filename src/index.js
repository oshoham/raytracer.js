import Vector from './vector'
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
      point: { x: 0.0, y: 1.8, z: 10 },
      fieldOfView: 45,
      direction: { x: 0.0, y: 3.0, z: 0.0 }
    },
    lights: [{ x: -30, y: -10, z: 20 }],
    objects: [
      {
        type: 'sphere',
        center: { x: 0, y: 3.5, z: -3 },
        radius: 3,
        color: { x: 155, y: 200, z: 155 },
        material: {
          specular: 0.2,
          lambert: 0.7,
          ambient: 0.1
        }
      },
      {
        type: 'sphere',
        center: {
          x: Math.sin(progress * 0.1) * 3.5,
          y: 2,
          z: -3 + (Math.cos(progress * 0.1) * 3.5)
        },
        radius: 0.2,
        color: { x: 155, y: 155, z: 155 },
        material: {
          specular: 0.1,
          lambert: 0.9,
          ambient: 0.0
        }
      },
      {
        type: 'sphere',
        center: {
          x: Math.sin(progress * 0.2) * 4,
          y: 3,
          z: -3 + (Math.cos(progress * 0.2) * 4)
        },
        radius: 0.1,
        color: { x: 255, y: 255, z: 255 },
        material: {
          specular: 0.2,
          lambert: 0.7,
          ambient: 0.1
        }
      }
    ]
  }

  return scene
}

const renderer = new Renderer(canvas, generateScene, { enableSampling: false })

renderer.tick()

document.getElementById('play').onclick = renderer.play.bind(renderer)
document.getElementById('stop').onclick = renderer.stop.bind(renderer)
