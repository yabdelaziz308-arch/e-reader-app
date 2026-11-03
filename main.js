const { app, BrowserWindow } = require('electron');
const path = require('path');

function createWindow() {
  const mainWindow = new BrowserWindow({
    width: 1100,
    height: 800,
    webPreferences: {
      nodeIntegration: true,
    },
    backgroundColor: '#121212', // Matches your app's dark background
  });

  // During development, it will look at your Vite running server
mainWindow.loadURL('http://127.0.0.1:5173');
  
  // To hide the default top file menu bar for a cleaner look:
  mainWindow.setMenuBarVisibility(false);
}

app.whenReady().then(() => {
  createWindow();

  app.on('activate', function () {
    if (BrowserWindow.getAllWindows().length === 0) createWindow();
  });
});

app.on('window-all-closed', function () {
  if (process.platform !== 'darwin') app.quit();
});