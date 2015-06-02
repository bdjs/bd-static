/**
 * bd-static - index.js
 * Created by mds on 15/6/2.
 */

'use strict';

var koa = require('koa');
var serve = require('../');

var app = koa();

app.use(serve('public'));
app.use(serve('public2', 'public2'));
app.use(serve('public', 'public'));

app.listen(3333);
