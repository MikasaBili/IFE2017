import './sort.css'
let sortmap = [
  18, 20, 34, 67, 99, 24, 35, 72, 17, 19, 73, 22, 46, 90
]

const maphtml = (val, index) => {
  return `
    <div class="map" style="height:${val}px;left:${index * 40}px;"></div>
  `
}
let sort = []
let html = ''
sortmap.forEach((val, index) => {
  html += maphtml(val, index)
})

document.getElementById('sort').innerHTML = html

let htmlarr = document.querySelectorAll('.map')
const len = sortmap.length

for (let i = 0; i < len; i++) {
  for (let j = 0; j < len - 1 - i; j++) {
    if (sortmap[j] > sortmap[j + 1]) {
      let s = sortmap[j]
      sortmap[j] = sortmap[j + 1]
      sortmap[j + 1] = s
    }
    let obj = {}
    sortmap.forEach((val, index) => {
      obj[index] = { val: val, color: 'salmon' }
    })
    obj[j + 1].color = 'orange'
    sort.push(obj)
  }
}

const getsort = setInterval(() => {
  if (sort.length === 0) {
    clearInterval(getsort)
    return false
  }
  let shift = sort.shift()
  for (let o in shift) {
    htmlarr[o].style.height = shift[o].val + 'px'
    htmlarr[o].style.background = shift[o].color
  }
  console.log(1)
}, 500)
