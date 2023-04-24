'use strict'
const merge = require('webpack-merge')
const prodEnv = require('./prod.env')

module.exports = merge(prodEnv, {
  NODE_ENV: '"development"',
  APP_APTION:'"/apis"',
  HREF:"http://192.168.4.177:8989/"
})
