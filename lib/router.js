const router = require('express').Router()

module.exports = (config) => {
  router.get('/test', (req, res, next) => {
    console.log('TEST ROUTE')
    res.send('OK')
  })

  return router
}
