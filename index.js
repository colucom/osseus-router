const path = require('path')

const init = function (osseus) {
  return new Promise((resolve, reject) => {
    const router = require(path.join(__dirname, '/lib/router'))(osseus.config)
    osseus.server.app.use(router)
    resolve(this)
  })
}

module.exports = {
  init: init
}
