const router = require('express').Router()

module.exports = (config) => {
  router.get('/test', (req, res, next) => {
    res.send('OK')
  })

  return router
}
