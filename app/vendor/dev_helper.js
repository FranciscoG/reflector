'use strict';

module.exports = {
    label: 'Development',
    submenu: [{
        label: 'Reload',
        accelerator: 'CmdOrCtrl+R',
        click: function () {
            var win = BrowserWindow.getFocusedWindow();
            win.webContents.reloadIgnoringCache();
        }
    },{
        label: 'Toggle DevTools',
        accelerator: 'Alt+CmdOrCtrl+I',
        click: function () {
            BrowserWindow.getFocusedWindow().toggleDevTools();
        }
    },{
        label: 'Quit',
        accelerator: 'CmdOrCtrl+Q',
        click: function () {
            app.quit();
        }
    }]
};
