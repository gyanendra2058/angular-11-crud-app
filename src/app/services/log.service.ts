import { Injectable } from '@angular/core';
import * as ld from 'logdown';
import {Logger} from 'logdown';

@Injectable({
  providedIn: 'root'
})
export class LogService {
  private readonly _logDown = ld;
  private readonly _colorPalette = {
    goldenRod: '#e09938',
    darkSlateGray: '#3b3c5a',
    teal: '#015a6b',
    seaGreen: '#348a5d',
    dimGray: '#6a645b',
    brown: '#ad2c34',
    peru: '#9c8041'
  };

  get logDown(): any {
    return this._logDown;
  }

  createComponentLogger(name: string): Logger {
    return this._createLogger(`comp:${name}`, this._colorPalette.goldenRod);
  }

  createServiceLogger(name: string): Logger {
    return this._createLogger(`serv:${name}`, this._colorPalette.teal);
  }

  createStoreLogger(name: string): Logger {
    return this._createLogger(`stor:${name}`, this._colorPalette.seaGreen);
  }

  createHelperLogger(name: string): Logger {
    return this._createLogger(`help:${name}`, this._colorPalette.peru);
  }

  private _createLogger(name: string, color: string): Logger{
    return this._logDown(name, {prefixColor: color, markdown: true});
  }
}
