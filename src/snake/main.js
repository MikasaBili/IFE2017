import './snake.less'
// 蛇的属性
const _snake = {
  initSnkae: [{x: 0, y: 0}, {x: 1, y: 0}, {x: 2, y: 0}, {x: 3, y: 0}, {x: 4, y: 0}],
  body: [{x: 0, y: 0}, {x: 1, y: 0}, {x: 2, y: 0}, {x: 3, y: 0}, {x: 4, y: 0}],
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
  gridSize: 30,
  star: {}
}

// 按键的属性
const _game = {
  new: 'right',
  isStart: true,
  order: [],
  games: true
}
class Snake {
  constructor (option) {
    Object.assign(this, _snake, _map, _game, option)
    this.snake = document.getElementById('snake')
    this.map = document.getElementById('map')
    this.star = document.getElementById('star')
    this.cover = document.querySelector('#cover')
  }
  init () {
    this.setMap()
    this.setSnake()
    this.setKeyboard()
    this.snakeTime()
    this.getStarGird()
  }
  // 设置地图
  setMap () {
    let canvas = this.map
    let cover = this.cover
    canvas.setAttribute('width', this.width)
    canvas.setAttribute('height', this.height)
    cover.style.width = this.width + 'px'
    cover.style.height = this.height + 'px'
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
    let snakeW = this.body.shift() // 尾 同时删除 尾
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
    // 下面是判断是否撞墙
    if (snakeHeader.x >= (this.width / this.gridSize) || snakeHeader.x < 0 || snakeHeader.y >= (this.height / this.gridSize) || snakeHeader.y < 0) { // 这个是撞墙
      this.games = false
      console.log('撞到墙了')
    }
    if (JSON.stringify(this.body).indexOf(JSON.stringify(snakeHeader)) !== -1) { // 撞到自己的身体
      this.games = false
      console.log('撞到了自己的身体')
    }
    this.body.push(snakeHeader) // 把新的头添加到最后面
    this.body.splice(this.body.length - 1, 0, snakeH) // 把上一个头的坐标添加到倒数第二个
    // 下面是判断蛇的头和star 坐标的头重复则表示吃到了星星,尾巴延长一个
    if (snakeHeader.x === this.star.x && snakeHeader.y === this.star.y) {
      this.body.unshift(snakeW)
      this.clearStar(this.star.x, this.star.y)
      this.getStarGird()
    }
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
        if (!this.isStart) {
          return false
        }
        this.snakeGO() // 设置body数组
        this.clearSnake() // 清除现在的蛇
        if (!this.games) {
          this.body = this.initSnkae
          this.games = true
          this.setMap()
          this.setSnake()
          this.suspend()
          return false
        }
        this.setSnake() // 设置新的数组产生的蛇
        this.snakeTime()
      }, 500)
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
    let conver = this.cover
    conver.classList.toggle('none', this.isStart)
    if (this.isStart) {
      this.snakeTime()
    }
  }
  // 设置键盘下一步
  nextOrder (next) {
    if (this.new === 'right' || this.new === 'left') {
      if (next !== 'right' && next !== 'left') {
        this.order.push(next)
        this.new = next
      }
    } else
    if (this.new === 'down' || this.new === 'up') {
      if (next !== 'down' && next !== 'up') {
        this.order.push(next)
        this.new = next
      }
    }
  }
  getStarGird () { // 获取坐标避免和身体重复
    let starX = Math.round(Math.random().toFixed(3) * 20)
    let starY = Math.round(Math.random().toFixed(3) * 20)
    let hasStar = []
    Array.from(this.body, (value) => {
      if (value.x === starX && value.y === starY) {
        hasStar.push(0)
      } else {
        hasStar.push(1)
      }
    })
    if (hasStar.indexOf(0) === -1) {
      this.setStar(starX, starY)
    } else {
      this.getStarGird()
    }
  }
  setStar (x, y) { // 设置星星
    this.star['x'] = x // 把坐标放到this中
    this.star['y'] = y
    let canvas = this.star
    canvas.setAttribute('width', this.width)
    canvas.setAttribute('height', this.height)
    let ctx = canvas.getContext('2d')
    ctx.fillStyle = '#ff9900'
    ctx.fillRect(x * this.gridSize, y * this.gridSize, this.gridSize, this.gridSize)
  }
  clearStar (x, y) { // 清除星星
    let canvas = this.star
    let ctx = canvas.getContext('2d')
    ctx.clearRect(x * this.gridSize, y * this.gridSize, this.gridSize, this.gridSize)
  }
}

let init = new Snake()
init.init()
