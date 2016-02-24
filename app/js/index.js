/* global riot */
'use strict';

const ipcRenderer = require('electron').ipcRenderer;
window.ipcRenderer = ipcRenderer;

var updateOnlineStatus = function() {
  let onlineIndicator = document.querySelector(".online-status");
  
  if (navigator.onLine) {
    onlineIndicator.classList.add('online');
  } else {
    onlineIndicator.classList.remove('online');
  }

  ipcRenderer.send('online-status-changed', navigator.onLine ? 'online' : 'offline');
};

window.addEventListener('online',  updateOnlineStatus);
window.addEventListener('offline',  updateOnlineStatus);

updateOnlineStatus();

riot.mount('site');
// riot.mount('screenshot-url');

