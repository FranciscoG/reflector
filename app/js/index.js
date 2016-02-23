/* global riot */
'use strict';

const ipcRenderer = require('electron').ipcRenderer;
window.ipcRenderer = ipcRenderer;

var updateOnlineStatus = function() {
  ipcRenderer.send('online-status-changed', navigator.onLine ? 'online' : 'offline');
};

window.addEventListener('online',  updateOnlineStatus);
window.addEventListener('offline',  updateOnlineStatus);

updateOnlineStatus();

riot.mount('site');
riot.mount('screenshot-url');

