[![JavaScript Style Guide](https://cdn.rawgit.com/standard/standard/master/badge.svg)](https://github.com/standard/standard)

# Osseus Router

[JSON Routes](https://github.com/gimox/json-routing) based osseus module to work with [osseus-server](https://github.com/colucom/osseus-server)

## Install
```bash
$ npm install osseus-router
```

## Usage

#### Configuration

Mandatory:

* `OSSEUS_ROUTER_DEPENDENCIES`
	* Your application must use [osseus-server](https://github.com/colucom/osseus-server)
	* See osseus dependencies explanation [here](https://github.com/colucom/osseus#dependencies)

Optional:

* `OSSEUS_ROUTER_ROUTES_PATH`
	* the path to your routes folder
	* default is `./routes`
* `OSSEUS_ROUTER_CONTROLLERS_PATH`
	* the path to your controllers folder
	* default is `./contollers`
* `OSSEUS_ROUTER_POLICY_PATH`
	* the path to your policy (middlewares) folder
	* default is `./policy`
* `OSSEUS_ROUTER_URL_PREFIX`
	* global prefix path for all routes

#### Example

`/routes/examples.json`:

```json
{
  "/examples/get": {
    "GET": {
      "route": "exampleGET",
      "policy": "global:firstPolicy"
    }
  },
  "/examples/post": {
    "POST": {
      "route": "examplePOST",
      "policy": [
        "global:firstPolicy",
        "global:secondPolicy"
      ]
    }
  }
}
```

`/controllers/ExamplesController.js`:

```javascript
module.exports = {
  exampleGET: (req, res, next) => {
    res.send({called: 'exampleGET'})
  },
  examplePOST: (req, res, next) => {
    res.send({called: 'examplePOST'})
  }
}
```

`/policy/global.js`:

```javascript
module.exports = {
  firstPolicy: (req, res, next) => {
    req.policies = req.policies || []
    req.policies.push('firstPolicy')
    next()
  },
  secondPolicy: (req, res, next) => {
    req.policies = req.policies || []
    req.policies.push('secondPolicy')
    next()
  }
}
```

Running:

```bash
$ node index.js --OSSEUS_SERVER_PORT 8080
```

Will start your application and listen on 8080.

Now, let's send some test requests and see what we get:

```bash
$ curl 0:3000/examples/get
```

will result in:

```bash
$ {"called":"exampleGET","policies":["firstPolicy"]}
```

and:

```bash
$ curl -XPOST 0:3000/examples/post
```

will result in:

```bash
$ {"called":"examplePOST","policies":["firstPolicy","secondPolicy"]}
```

More detailed examples can be found [here](https://github.com/gimox/json-routing)

## License
Code released under the [MIT License](https://github.com/colucom/osseus-router/blob/master/LICENSE).
