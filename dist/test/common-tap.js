'use strict';
/* eslint-disable camelcase */

var fs = require('graceful-fs');
var readCmdShim = require('read-cmd-shim');
var Bluebird = require('bluebird');

// cheesy hackaround for test deps (read: nock) that rely on setImmediate
if (!global.setImmediate || !require('timers').setImmediate) {
  require('timers').setImmediate = global.setImmediate = function () {
    var args = [arguments[0], 0].concat([].slice.call(arguments, 1));
    setTimeout.apply(this, args);
  };
}

var spawn = require('child_process').spawn;
var path = require('path');

var port = exports.port = 1337;
exports.registry = 'http://localhost:' + port;
var ourenv = {};
ourenv.npm_config_loglevel = 'error';
ourenv.npm_config_progress = 'false';
ourenv.npm_config_metrics = 'false';
ourenv.npm_config_audit = 'false';

var npm_config_cache = path.resolve(__dirname, 'npm_cache');
ourenv.npm_config_cache = exports.npm_config_cache = npm_config_cache;
ourenv.npm_config_userconfig = exports.npm_config_userconfig = path.join(__dirname, 'fixtures', 'config', 'userconfig');
ourenv.npm_config_globalconfig = exports.npm_config_globalconfig = path.join(__dirname, 'fixtures', 'config', 'globalconfig');
ourenv.npm_config_global_style = 'false';
ourenv.npm_config_legacy_bundling = 'false';
ourenv.npm_config_fetch_retries = '0';
ourenv.random_env_var = 'foo';
// suppress warnings about using a prerelease version of node
ourenv.npm_config_node_version = process.version.replace(/-.*$/, '');
var _iteratorNormalCompletion = true;
var _didIteratorError = false;
var _iteratorError = undefined;

try {
  for (var _iterator = Object.keys(ourenv)[Symbol.iterator](), _step; !(_iteratorNormalCompletion = (_step = _iterator.next()).done); _iteratorNormalCompletion = true) {
    var key = _step.value;
    process.env[key] = ourenv[key];
  }
} catch (err) {
  _didIteratorError = true;
  _iteratorError = err;
} finally {
  try {
    if (!_iteratorNormalCompletion && _iterator.return) {
      _iterator.return();
    }
  } finally {
    if (_didIteratorError) {
      throw _iteratorError;
    }
  }
}

var bin = exports.bin = require.resolve('../bin/mp.js');

var chain = require('slide').chain;
var once = require('once');

var nodeBin = exports.nodeBin = process.env.npm_node_execpath || process.env.NODE || process.execPath;

exports.mp = function (cmd, opts, cb) {
  if (!cb) {
    var prom = new Bluebird(function (resolve, reject) {
      cb = function cb(err, code, stdout, stderr) {
        if (err) return reject(err);
        return resolve([code, stdout, stderr]);
      };
    });
  }

  cb = once(cb);

  cmd = [bin].concat(cmd);
  opts = Object.assign({}, opts || {});

  opts.env = opts.env || process.env;
  if (opts.env._storage) opts.env = Object.assign({}, opts.env._storage);
  if (!opts.env.npm_config_cache) {
    opts.env.npm_config_cache = npm_config_cache;
  }
  if (!opts.env.npm_config_send_metrics) {
    opts.env.npm_config_send_metrics = 'false';
  }
  if (!opts.env.npm_config_audit) {
    opts.env.npm_config_audit = 'false';
  }

  nodeBin = opts.nodeExecPath || nodeBin;

  var stdout = '';
  var stderr = '';

  var child = spawn(nodeBin, cmd, opts);

  if (child.stderr) {
    child.stderr.on('data', function (chunk) {
      stderr += chunk;
    });
  }

  if (child.stdout) {
    child.stdout.on('data', function (chunk) {
      stdout += chunk;
    });
  }

  child.on('error', cb);

  child.on('close', function (code) {
    cb(null, code, stdout, stderr);
  });
  return prom || child;
};