import { app, BrowserWindow, ipcMain } from 'electron';
import * as path from 'path';
import { createMenu } from './menu';

function createWindow(): void {
    const win = new BrowserWindow({
        width: 1200,
        height: 800,
        webPreferences: {
            nodeIntegration: true,
            contextIsolation: false,
            webviewTag: true,
            webSecurity: false
        }
    });

    win.loadFile(path.join(__dirname, '../src/index.html'));
    //win.webContents.openDevTools();  // 開発ツールを開く
    createMenu(win);
}


app.whenReady().then(() => {
    createWindow();

    app.on('activate', () => {
        if (BrowserWindow.getAllWindows().length === 0) {
            createWindow();
        }
    });
});

app.on('window-all-closed', () => {
    if (process.platform !== 'darwin') {
        app.quit();
    }
});
