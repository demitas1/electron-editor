import { app, BrowserWindow } from 'electron';
import * as path from 'path';
import { createMenu } from './menu';
import { initialize } from '@electron/remote/main';

// @electron/remote の初期化
initialize();

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

    // @electron/remote のセットアップ
    require('@electron/remote/main').enable(win.webContents);

    win.loadFile(path.join(__dirname, '../src/index.html'));
    //win.webContents.openDevTools();
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
