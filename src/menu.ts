import { Menu, BrowserWindow, MenuItemConstructorOptions, dialog } from 'electron';
import * as fs from 'fs';

export function createMenu(mainWindow: BrowserWindow) {
    const keyBindTemplate: MenuItemConstructorOptions[] = [
        {
            label: 'File',
            submenu: [
                {
                    label: 'New',
                    accelerator: 'CmdOrCtrl+N',
                    click: () => {
                        mainWindow.webContents.send('file-new');
                    }
                },
                {
                    label: 'Open',
                    accelerator: 'CmdOrCtrl+O',
                    click: async () => {
                        const result = await dialog.showOpenDialog(mainWindow, {
                            properties: ['openFile'],
                            filters: [
                                { name: 'All Files', extensions: ['*'] }
                            ]
                        });

                        if (!result.canceled && result.filePaths.length > 0) {
                            const filePath = result.filePaths[0];
                            try {
                                const content = fs.readFileSync(filePath, 'utf-8');
                                mainWindow.webContents.send('file-opened', { filePath, content });
                            } catch (err: any) {
                                dialog.showErrorBox('Error', `Failed to open file: ${err?.message || 'Unknown error'}`);
                            }
                        }
                    }
                },
                {
                    label: 'Save',
                    accelerator: 'CmdOrCtrl+S',
                    click: () => {
                        mainWindow.webContents.send('file-save');
                    }
                },
                {
                    label: 'Save As',
                    accelerator: 'CmdOrCtrl+Shift+S',
                    click: () => {
                        mainWindow.webContents.send('file-save-as');
                    }
                },
                { type: 'separator' },
                {
                    role: 'quit'
                }
            ]
        },
        {
            label: 'Edit',
            submenu: [
                { role: 'undo' },
                { role: 'redo' },
                { type: 'separator' },
                { role: 'cut' },
                { role: 'copy' },
                { role: 'paste' }
            ]
        },
        {
            label: 'KeyBinding',
            submenu: [
                {
                    label: 'Normal',
                    type: 'radio',
                    checked: true,
                    click: () => {
                        mainWindow.webContents.send('change-keybinding', 'normal');
                    }
                },
                {
                    label: 'Vim',
                    type: 'radio',
                    click: () => {
                        mainWindow.webContents.send('change-keybinding', 'vim');
                    }
                },
                {
                    label: 'Emacs',
                    type: 'radio',
                    click: () => {
                        mainWindow.webContents.send('change-keybinding', 'emacs');
                    }
                }
            ]
        }
    ];

    const menu = Menu.buildFromTemplate(keyBindTemplate);
    Menu.setApplicationMenu(menu);
}
