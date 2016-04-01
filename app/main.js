'use strict';
const electron = require('electron');
const ipcMain = electron.ipcMain;
const app = electron.app;
const BrowserWindow = electron.BrowserWindow;
const dialog = require('electron').dialog;
const shell = require('electron').shell;
var Menu = require("menu");

var env = require('./vendor/env_config');
var devHelper = require('./vendor/dev_helper');
var myMenu = require('./lib/shortkeys.js');
var windowStateKeeper = require('./vendor/window_state');

var onlineStatusWindow;
let mainWindow;

var mainWindowState = windowStateKeeper('main', {
  width: 1000,
  height: 700
});

function createWindow () {
  mainWindow = new BrowserWindow({
    x: mainWindowState.x,
    y: mainWindowState.y,
    width: mainWindowState.width,
    height: mainWindowState.height
  });
  
  if (mainWindowState.isMaximized) {
    mainWindow.maximize();
  }

  mainWindow.loadURL('file://' + __dirname + '/index.html');

  if (env.name !== 'production') {
    myMenu.push(devHelper)
    mainWindow.openDevTools();
  }
  
  /*********************************/
  var menu = Menu.buildFromTemplate(myMenu);
  Menu.setApplicationMenu(menu);
  /*********************************/

  mainWindow.on('close', function () {
    mainWindowState.saveState(mainWindow);
  });

  mainWindow.on('closed', function() {
    mainWindow = null;
  });

  
}

app.on('ready', createWindow);

app.on('window-all-closed', function () {
  if (process.platform !== 'darwin') {
    app.quit();
  }
});

app.on('activate', function () {
  if (mainWindow === null) {
    createWindow();
  }
});

/***********************************************************/

ipcMain.on('online-status-changed', function(event, status) {
  onlineStatusWindow = status;
  console.log(status);
});

ipcMain.on('url-submit', function(event, url, un, pw) {
  let Spidey = new require('./lib/sitemap.js')({
    url : url,
    user : un || '',
    password : pw || '',
    fetchcomplete : function(queueItem){
      event.sender.send('url-fetched', queueItem.url);
    }
  });

});

/* screenshot stuff */
var Screenshot = require('./lib/screenshot.js');
ipcMain.on('capture-submit', function(event, options, path, filename) {
  
  let ss = new Screenshot(options);
  if (path) {
    ss.filePath = path;
  }
  if (filename && filename !== '') {
    ss.fileName = filename;
  }
  ss.run();
  
  shell.showItemInFolder(path);
});

/**
 * https://github.com/atom/electron/blob/master/docs/api/dialog.md
 */
ipcMain.on('open-dialog', function(event, dialogOptions, returnEvent) {
  dialog.showOpenDialog(dialogOptions, function(filenames){
    event.sender.send(returnEvent, filenames);
  });
});