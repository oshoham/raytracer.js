import Ray from './ray'
import Vector from './vector'
import Renderer from './renderer'

const ray = new Ray()

const canvas = document.getElementById('canvas')
const width = window.innerWidth * 0.5
const height = window.innerHeight * 0.5

canvas.width = width
canvas.height = height
canvas.style.cssText = `width:${(width * 2)}px;height:${(height * 2)}px`

const scene = {
  camera: {
    point: new Vector(0.0, 0.0, 0.0),
    fieldOfView: 45,
    direction: new Vector(0.0, 3.0, 0.0)
  },
  lights: [new Vector(-30, -10, 20)],
  objects: []
}

const renderer = new Renderer(canvas, scene)
