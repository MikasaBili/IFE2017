import './snake.less'
// 蛇的属性
const _snake = {
  body: [{
    x: 0,
    y: 0
  }, {
    x: 1,
    y: 0
  }, {
    x: 2,
    y: 0
  }, {
    x: 3,
    y: 0
  }, {
    x: 4,
    y: 0
  }],
  bodyColor: '#888888',
  headColor: '#37c700'
}
// map的属性
const _map = {
  width: 600,
  height: 600,
  mapColor: {
    colorO: '#e6e6e6',
    colorT: '#d2d2d2'
  },
  gridSize: 30
}

// 按键的属性
const _game = {
  new: 'right',
  isStart: true,
  order: []
}
class Snake {
  constructor () {
    Object.assign(this, _snake, _map, _game)
    this.snake = document.getElementById('snake')
    this.map = document.getElementById('map')
  }
  init () {
    this.setMap()
    this.setSnake()
    this.setKeyboard()
    this.snakeTime()
  }
  // 设置地图
  setMap () {
    let canvas = this.map
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
    let canvas = this.snake
    canvas.setAttribute('width', this.width)
    canvas.setAttribute('height', this.height)
    let ctx = canvas.getContext('2d')
    Array.from(this.body, (value) => {
      if (value === this.body[this.body.length - 1]) {
        ctx.fillStyle = this.headColor
      } else {
        ctx.fillStyle = this.bodyColor
      }
      ctx.fillRect(value.x * this.gridSize, value.y * this.gridSize, this.gridSize, this.gridSize)
    })
  }
  // 爬行
  snakeGO () {
    let snakeHeader = this.body[this.body.length - 1] // 头
    let snakeH = Object.assign({}, snakeHeader) // 复制头,这个头代替删除的尾,深拷贝
    this.body.pop() // 删除头
    this.body.shift() // 尾 同时删除 尾
    console.log(this.body)
    if (this.order.length) {
      let next = this.order.shift()
      if (next === 'right') {
        snakeHeader.x += 1
      } else
      if (next === 'left') {
        snakeHeader.x -= 1
      } else
      if (next === 'up') {
        snakeHeader.y -= 1
      } else
      if (next === 'down') {
        snakeHeader.y += 1
      }
    } else {
      if (this.new === 'right') {
        snakeHeader.x += 1
      } else
      if (this.new === 'left') {
        snakeHeader.x -= 1
      } else
      if (this.new === 'up') {
        snakeHeader.y -= 1
      } else
      if (this.new === 'down') {
        snakeHeader.y += 1
      }
    }
    this.body.push(snakeHeader) // 把新的头添加到最后面
    this.body.splice(this.body.length - 1, 0, snakeH) // 把上一个头的坐标添加到倒数第二个
  }
  // 清除蛇
  clearSnake () {
    let canvas = this.snake
    let ctx = canvas.getContext('2d')
    ctx.clearRect(0, 0, this.width, this.height)
  }
  // 爬行时间
  snakeTime () {
    const time = () => {
      setTimeout(() => {
        console.log(this.isStart, 3)
        if (!this.isStart) {
          return false
        }
        this.snakeGO() // 设置body数组
        this.clearSnake() // 清除现在的蛇
        this.setSnake() // 设置新的数组产生的蛇
        this.snakeTime()
      }, 1000)
    }
    time()
  }
  // 绑定键盘
  setKeyboard () {
    document.addEventListener('keydown', this.getKeyboard.bind(this))
  }
  // 监控键盘操作
  getKeyboard (e) {
    switch (e.keyCode) {
      case 32:
        this.suspend()
        break
      case 38:
        this.nextOrder('up')
        break
      case 39:
        this.nextOrder('right')
        break
      case 40:
        this.nextOrder('down')
        break
      case 37:
        this.nextOrder('left')
        break
    }
  }
  // 暂停
  suspend () {
    this.isStart = !this.isStart
  }
  // 设置键盘下一步
  nextOrder (next) {
    if (this.new === 'right' || this.new === 'left') {
      if (next !== 'right' && next !== 'left') {
        this.order.push(next)
        this.new = next
        console.log(this.order)
      }
    } else
    if (this.new === 'down' || this.new === 'up') {
      if (next !== 'down' && next !== 'up') {
        this.order.push(next)
        this.new = next
        console.log(this.order)
      }
    }
  }
}
let init = new Snake()
init.init()
