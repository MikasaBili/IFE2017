// 输出模板
export default class SetTemplate {
  constructor (map = [], paretn = 'body') {
    this.paretn = paretn
    this.map = map
    this.dom = ''
  }
  setHtml () {
    const mapArray = this.map
    mapArray.forEach((value) => {
      this.dom += this.getHtml(value)
    })
    document.querySelector(this.paretn).innerHTML = this.dom
  }
  getHtml (_obj) {
    return `
    <div class="card">
      <p>
        题目：
        <a class="topic">${_obj.name}</a>
      </p>
      <p>
        完成作品：
        <a href="${_obj.href}" class="link">Demo</a>
      </p>
    </div>
    `
  }
}
