const cwd = process.cwd()
const routing = require('json-routing')

module.exports = (osseus) => {
  const options = {
    routesPath: osseus.config.osseus_router.routes_path,
    controllersPath: osseus.config.osseus_router.controllers_path,
    policyPath: osseus.config.osseus_router.policy_path,
    processDir: cwd
  }
  if (osseus.config.osseus_router.url_prefix) {
    options.urlPrefix = osseus.config.osseus_router.url_prefix
  }
  console.log(`router options: ${JSON.stringify(options)}`)
  const router = new routing.JsonRoute(osseus.server.app, options)
  return router
}
