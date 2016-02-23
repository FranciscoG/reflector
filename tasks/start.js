'use strict'

var electron = require('electron-prebuilt');
var childProcess = require('child_process');
var kill = require('tree-kill');
var utils = require('./utils');
var pathUtil = require('path');

var watch;

var dest = './app';

var projectDir = require('fs-jetpack');
var destDir = projectDir.cwd(dest)

var riotPAth = pathUtil.resolve('./node_modules/.bin/riot');
if (process.platform === 'win32') {
  riotPAth += '.cmd';
}

var runRiotWatch = function () {
  watch = childProcess.spawn(riotPAth, [
    '--watch',
    './app/js/tags',
    './app/js/tags.js'
  ], {
    stdio: 'inherit'
  });
};

var runApp = function () {
  runRiotWatch();

  var configFilePath = projectDir.path('config/env_' + utils.getEnvName() + '.json');
  destDir.remove('env_config.json');
  destDir.copy(configFilePath, 'env_config.json');

  var app = childProcess.spawn(electron, ['./app/main.js'], {
    stdio: 'inherit'
  });

  app.on('close', function (code) {
    // User closed the app. Kill the host process.
    kill(watch.pid, 'SIGKILL', function () {
      process.exit()
    })
  });

};

runApp();
