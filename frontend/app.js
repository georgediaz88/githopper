const Server = require('./server.js')
const newrelic = require('./newrelic.js')
const host = '0.0.0.0'
const port = (process.env.PORT || 80)

const app = Server.app()

if (process.env.NODE_ENV !== 'production') {
  const webpack = require('webpack')
  const webpackDevMiddleware = require('webpack-dev-middleware')
  const webpackHotMiddleware = require('webpack-hot-middleware')
  const config = require('./webpack.dev.config.js')
  const compiler = webpack(config)

  app.use(webpackHotMiddleware(compiler))
  app.use(webpackDevMiddleware(compiler, {
    noInfo: true,
    publicPath: config.output.publicPath
  }))
}

app.listen(port, host)
console.log(`Listening at http://${host}:${port}`)
