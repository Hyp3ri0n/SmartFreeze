'use strict';

require('electron-reload')(__dirname);
const electron = require('electron');

const ipcMain = electron.ipcMain;
const app = electron.app;
const BrowserWindow = electron.BrowserWindow;

var mainWindow = null;

app.on('window-all-closed', function () {
  if (process.platform !== 'darwin') {
    app.quit();
  }
});

const createWindowApp = () => {
  mainWindow = new BrowserWindow({ width: 1200, height: 900, frame: true, show: false });
  mainWindow.loadURL('file://' + __dirname + '/index.html');

  mainWindow.webContents.openDevTools();

  mainWindow.show();
  //mainWindow.maximize();

  mainWindow.on('closed', () => {
    mainWindow = null;
  });
};

app.on('ready', createWindowApp);

