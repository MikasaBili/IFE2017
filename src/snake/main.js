import './snake.less'
const _snake = {
  body: [0, 1, 2, 3, 4],
  bodyColor: '#888888',
  headColor: '#37c700'
}
// 需要把背景和蛇分成2个模块 只用刷新蛇不用刷新背景
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
    this.bu = document.getElementById('bu')
  }
  init () {
    this.setMap()
    this.setSnake()
  }
  // 设置地图
  setMap () {
    let canvas = this.bu
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
    canvas.setAttribute('width', this.width)
    canvas.setAttribute('height', this.height)
    let ctx = canvas.getContext('2d')
    Array.from(this.body, (value) => {
      if (value === this.body[this.body.length - 1]) {
        ctx.fillStyle = this.headColor
      } else {
        ctx.fillStyle = this.bodyColor
      }
      ctx.fillRect(value * this.gridSize, 0, this.gridSize, this.gridSize)
    })
  }
  // 爬行
  snakeGO () {
    this.body = Array.from(this.body, (value) => {
      return (value = value + 1)
    })
  }
  // 爬行时间
  snakeTime () {
    setInterval(() => {
      this.snakeGO()
      let canvas = this.canvas
      let ctx = canvas.getContext('2d')
      ctx.clearRect(0, 0, this.width, this.height)
      this.setSnake()
    }, 1000)
  }
}
let init = new Snake()
init.init()
