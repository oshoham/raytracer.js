import Vector from './vector'
import { Sphere } from './objects'
import Material from './material'
import Renderer from './renderer'

const canvas = document.getElementById('canvas')
const width = window.innerWidth * 0.5
const height = window.innerHeight * 0.5

canvas.width = width
canvas.height = height
canvas.style.cssText = `width:${(width * 2)}px;height:${(height * 2)}px`

const renderer = new Renderer(canvas, function (progress) {
  const scene = {
    camera: {
      point: new Vector(0.0, 0.0, 0.0),
      fieldOfView: 45,
      direction: new Vector(0.0, 3.0, 0.0)
    },
    lights: [new Vector(-30, -10, 20)],
    objects: [
      new Sphere({
        center: new Vector(0, 3.5, -3),
        radius: 3,
        color: new Vector(155, 200, 155),
        material: new Material({
          specular: 0.2,
          lambert: 0.7,
          ambient: 0.1
        })
      }),
      new Sphere({
        center: new Vector(Math.sin(progress * 0.1) * 3.5, 2, -3 + (Math.cos(progress * 0.1) * 3.5)),
        radius: 0.2,
        color: new Vector(155, 155, 155),
        material: new Material({
          specular: 0.1,
          lambert: 0.9,
          ambient: 0.0
        })
      }),
      new Sphere({
        center: new Vector(Math.sin(progress * 0.2) * 4, 3, -3 + (Math.cos(progress * 0.2) * 4)),
        radius: 0.1,
        color: new Vector(255, 255, 255),
        material: new Material({
          specular: 0.2,
          lambert: 0.7,
          ambient: 0.1
        })
      })
    ]
  }

  return scene
})

renderer.play()
