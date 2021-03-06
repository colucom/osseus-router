[![JavaScript Style Guide](https://cdn.rawgit.com/standard/standard/master/badge.svg)](https://github.com/standard/standard)

# Osseus Router

[JSON Routes (for osseus)](https://github.com/colucom/json-routing) based osseus module to work with [osseus-server](https://github.com/colucom/osseus-server)

## Install
```bash
$ npm install @colucom/osseus-router
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
* `OSSEUS_ROUTER_CONTROLLER_NAME_NO_UPPERCASE`
  * set to `true` in order for contorller names not to begin with uppercase (which is the default)

#### Example

`/routes/examples.json`:

```json
{
  "/example": {
    "GET": {
      "policy": "global:firstPolicy",
      "route": "exampleGET"
    },
    "POST": {
      "policy": [
        "global:firstPolicy",
        "global:secondPolicy"
      ],
      "route": "./controllers/AnotherController:examplePOST"
    }
  }
}
```

***Note***

*By default all routes in `/routes/example.json` are assumed to be in `/controllers/ExamplesController.js` but in case you want to use a route from another controller need to specify its location*

`/policy/global.js`:

```javascript
module.exports = (osseus) => {
  return {
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
}
```

`/controllers/ExamplesController.js`:

```javascript
module.exports = (osseus) => {
  return {
    examplePOST: (req, res, next) => {
      res.send({called: 'examplePOST', policies: req.policies})
    }
  }
}
```

`/controllers/AnotherController.js`:

```javascript
module.exports = (osseus) => {
  return {
    examplePOST: (req, res, next) => {
      res.send({called: 'examplePOST', policies: req.policies})
    }
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
$ curl 0:3000/example
```

will result in:

```bash
$ {"called":"exampleGET","policies":["firstPolicy"]}
```

and:

```bash
$ curl -XPOST 0:3000/example
```

will result in:

```bash
$ {"called":"examplePOST","policies":["firstPolicy","secondPolicy"]}
```

More detailed examples can be found [here](https://github.com/colucom/json-routing)

## Contributing
Please see [contributing guidelines](https://github.com/colucom/osseus-router/blob/master/.github/CONTRIBUTING.md).

## License
Code released under the [MIT License](https://github.com/colucom/osseus-router/blob/master/LICENSE).
