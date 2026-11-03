
const { app, BrowserWindow } = require('electron');
const path = require('path');

function createWindow() {
    const win = new BrowserWindow({
        width: 1200,
        height: 800,
        webPreferences: {
            contextIsolation: true,
            nodeIntegration: false
        }
    });

    if (app.isPackaged) {
        win.loadFile(path.join(__dirname, 'dist', 'index.html'));
    } else {
       win.loadURL('http://127.0.0.1:5173');
    }
}

app.whenReady().then(createWindow);

app.on('window-all-closed', () => {
    if (process.platform !== 'darwin') {
        app.quit();
    }
});
