import { Injectable } from '@angular/core';
import * as childProcess from 'child_process';
import { ipcRenderer, webFrame } from 'electron';
import * as fs from 'fs';

// If you import a module but never use any of the imported values other than as TypeScript types,
// the resulting javascript file will look as if you never imported the module at all.
@Injectable()
export class ElectronService {
    ipcRenderer: typeof ipcRenderer;
    webFrame: typeof webFrame;
    childProcess: typeof childProcess;
    fs: typeof fs;

    get isElectron(): boolean {
        return !!(window && window.process && window.process.type);
    }

    constructor() {
        // Conditional imports
        if (this.isElectron) {
            this.ipcRenderer = window.require('electron').ipcRenderer;
            this.webFrame = window.require('electron').webFrame;

            this.childProcess = window.require('child_process');
            this.fs = window.require('fs');
        }
    }
}
