'use strict';

const ipcRenderer = require('electron').ipcRenderer;
var updateOnlineStatus = function() {
  ipcRenderer.send('online-status-changed', navigator.onLine ? 'online' : 'offline');
};

window.addEventListener('online',  updateOnlineStatus);
window.addEventListener('offline',  updateOnlineStatus);

updateOnlineStatus();


var url = document.getElementById('url');
var un = document.getElementById('un');
var pw = document.getElementById('pw');
var submit = document.getElementById('submit');

var handleUrlSubmit = function(e){
  e.preventDefault();
  console.log( url.value, un.value, pw.value );
  ipcRenderer.send('url-submit', url.value, un.value, pw.value);
};
submit.addEventListener('click', handleUrlSubmit);

ipcRenderer.on('url-fetched', function(event, arg) {
  // for now doc write but do something better eventually
  document.writeln(`<p>${arg}</p>`); // prints "pong"
});