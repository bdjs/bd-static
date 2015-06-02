/**
 * bd-static - index.js
 * Created by mds on 15/6/2.
 */

'use strict';

/**
 * Module dependencies.
 */

var resolve = require('path').resolve;
var assert = require('assert');
var debug = require('debug')('koa-static');
var send = require('koa-send');

/**
 * Expose `serve()`.
 */

module.exports = serve;

var routes = {};

/**
 * Serve static files from `root`.
 *
 * @param {String} root
 * @param {Object} [opts]
 * @return {Function}
 * @api public
 */

function serve(root, route, opts) {
  opts = opts || {};
  route = route || '/';
  assert(root, 'root directory is required to serve files');

  // options
  debug('static "%s" "%s" %j', route, root, opts);
  opts.root = resolve(root);
  opts.index = opts.index || 'index.html';

  routes[route] = opts;
  return function *serve(next) {
    yield* next;
    console.log(this.path);
    var route = this.path.split('/')[1] || '/';
    if (this.method != 'HEAD' && this.method != 'GET') return;
    // response is already handled
    if (this.body != null || this.status != 404) return;

    yield send(this, this.path.slice(1 + route.length) || '/', routes[route]);
  };
}
