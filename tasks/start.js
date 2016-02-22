'use strict'

var electron = require('electron-prebuilt')
var childProcess = require('child_process')
var kill = require('tree-kill')
var utils = require('./utils')

var dest = './app'

var projectDir = require('fs-jetpack')
var destDir = projectDir.cwd(dest)

var runApp = function () {
  
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
