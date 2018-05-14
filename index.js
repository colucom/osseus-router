const path = require('path')

const init = function (osseus) {
  this.osseus = osseus
  return new Promise((resolve, reject) => {
    const router = require(path.join(__dirname, '/lib/router'))(osseus.config)
    Object.assign(this, router)
    resolve(this)
  })
}

module.exports = {
  init: init
}
