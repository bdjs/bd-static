/**
 * bd-static - index.js
 * Created by mds on 15/6/2.
 * Updated by jiasm on 18/04/19
 */

'use strict'

/**
 * Module dependencies.
 */

const resolve = require('path').resolve
const assert = require('assert')
const send = require('koa-send')

/**
 * Expose `serve()`.
 */

const routes = {}

/**
 * Serve static files from `root`.
 *
 * @param {String} root
 * @param {Object} [opts]
 * @return {Function}
 * @api public
 */

module.exports = function serve (root, route = '/', opts = {}) {
  assert(root, 'root directory is required to serve files')

  // options
  opts.root = resolve(root)
  opts.index = opts.index || 'index.html'

  routes[route] = opts
  return async function serve (next) {
    await next()
    var route = this.path.split('/')[1] || '/'
    if (this.method !== 'HEAD' && this.method !== 'GET') return
    // response is already handled
    if (this.body !== null || this.status !== 404) return

    await send(this, this.path.slice(1 + route.length) || '/', routes[route])
  }
}
