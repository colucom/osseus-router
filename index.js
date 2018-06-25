const path = require('path')

const init = function (osseus) {
  this.osseus = osseus
  return new Promise((resolve, reject) => {
    const router = require(path.join(__dirname, '/lib/router'))(osseus)
    this.router = router
    resolve(this)
  })
}

const start = function () {
  this.router.start()
}

module.exports = {
  init: init,
  start: start
}
