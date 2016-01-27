'use strict';
const electron = require('electron');
const ipcMain = electron.ipcMain;
const app = electron.app;
const BrowserWindow = electron.BrowserWindow;

var onlineStatusWindow;

let mainWindow;

function createWindow () {
  mainWindow = new BrowserWindow({width: 700, height: 700});
  mainWindow.loadURL('file://' + __dirname + '/index.html');

  // Open the DevTools.
  // mainWindow.webContents.openDevTools();

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

const screenshot = require('electron-screenshot-app');
const fs = require('fs');

ipcMain.on('capture-submit', function(event, url) {
  screenshot({
      url: url,
      width: 1920,
      height: 1080,
      page: true
    },
    function(err, image){
      fs.writeFileSync('screenshot.png', image.data);
    })
});