import { Menu, BrowserWindow, MenuItemConstructorOptions } from 'electron';

export function createMenu(mainWindow: BrowserWindow) {
    const keyBindTemplate: MenuItemConstructorOptions[] = [
        {
            label: 'File',
            submenu: [
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
