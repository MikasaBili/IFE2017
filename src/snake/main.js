import './snake.less'
const _snake = {
  body: [0, 1, 2, 3, 4],
  bodyColor: '#888888',
  headColor: '#37c700'
}

const _map = {
  width: 600,
  height: 600,
  mapColor: {
    colorO: '#e6e6e6',
    colorT: '#d2d2d2'
  },
  gridSize: 30
}
class Snake {
  constructor () {
    Object.assign(this, _snake, _map)
    this.canvas = document.getElementById('snake')
  }
  init () {
    this.setMap()
    this.setSnake()
  }
  // 设置地图
  setMap () {
    let canvas = this.canvas
    canvas.setAttribute('width', this.width)
    canvas.setAttribute('height', this.height)
    let ctx = canvas.getContext('2d')
    ctx.strokeRect(0, 0, this.width, this.height)
    for (let i = 0; i < this.width / this.gridSize; i++) {
      for (let j = 0; j < this.height / this.gridSize; j++) {
        ctx.fillStyle = (i + j) % 2 ? this.mapColor.colorO : this.mapColor.colorT
        ctx.fillRect(i * this.gridSize, j * this.gridSize, this.gridSize, this.gridSize)
      }
    }
  }
  // 画蛇
  setSnake () {
    let canvas = this.canvas
    let ctx = canvas.getContext('2d')
    for (let i = 0; i < 5; i++) {
      if (i === 4) {
        ctx.fillStyle = this.headColor// 头
      } else {
        ctx.fillStyle = this.bodyColor // 身体
      }
      ctx.fillRect(i * this.gridSize, 0, this.gridSize, this.gridSize)
    }
  }
}

let init = new Snake()
init.init()
