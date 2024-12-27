import { app, BrowserWindow } from 'electron';
import * as path from 'path';

function createWindow(): void {
    const win = new BrowserWindow({
        width: 1200,
        height: 800,
        webPreferences: {
            nodeIntegration: true,
            contextIsolation: false,  // 追加
            webviewTag: true,
            webSecurity: false  // 開発時のみ。本番環境では true にすることを推奨
        }
    });

    win.loadFile(path.join(__dirname, '../src/index.html'));
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
