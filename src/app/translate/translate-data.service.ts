import { Injectable } from '@angular/core';
import { TranslateService } from '@ngx-translate/core';
import { Store } from '@ngxs/store';
import { Logger } from 'logdown';
import { LogService } from '../services/log.service';
import { GotTranslations } from '../store/app/app.actions';

@Injectable({
  providedIn: 'root',
})
/* eslint-disable dot-notation, @typescript-eslint/dot-notation */
export class TranslateDataService {
  private readonly _logger: Logger;
  locale: string = this._initializeLocale();
  readonly timezone: string = this._initializeTimeZone();

  constructor(
    private readonly _translateService: TranslateService,
    private readonly _logService: LogService,
    private _store: Store
  ) {
    this._logger = this._logService.createServiceLogger(TranslateDataService.name);

    // this language will be used as a fallback when a translation isn't found in the current language
    this._translateService.setDefaultLang('en-US');

    // this is the language to use throughout
    this._translateService.use(this.locale);
  }

  /**
   * Check if the current locale is in the set of languages available in the translation service.
   */
  isLoaded(): boolean {
    // TODO: This is a short-term fix for handling when a language isn't loaded, so that the fallback still works.
    // It appears that this array is not populated until it actually gets languages. In the future, we should do
    // more robust checks in the setting of a locale, so that we ensure we have loaded.
    return this._translateService.getLangs().length > 0;
  }

  /**
   * Load the translation, and call the provided callback after it has loaded. This helps callers to populate localizations
   * within TypeScript with less complexity in asynchronous code and checks on the translation.
   */
  public load(callback: () => unknown): void {
    if (this.isLoaded()) {
      this._logger.info('Translation is loaded.');
      this._store.dispatch(new GotTranslations());
      callback();
      return;
    }

    // Not loaded yet...try again shortly.
    this._logger.info('Waiting for translation to load...');
    setTimeout(() => {
      this.load(callback);
    }, 100);
  }

  /**
   * Synchronously returns a translation string for the specified resource key. Acts as a wrapper to TranslateService.instant.
   */
  public get(
    key: string | Array<string>,
    interpolateParams?: Record<string, unknown>
  ): string | any {
    return this._translateService.instant(key, interpolateParams);
  }

  /**
   * Get the locale to use from where App Hub sets it. If unavailable, fall back to the browser's current language.
   */
  private _initializeLocale(): string {
    let locale;
    try {
      locale = this._getWindowNavPreferences();
      if (locale === '') {
        locale = this._translateService.getBrowserCultureLang();
      }
    } catch (ex) {
      locale = this._translateService.getBrowserCultureLang();
    }

    return locale;
  }

  /**
   * Get the time zone to use from where App Hub sets it. If unavailable, fall back to UTC.
   */
  private _initializeTimeZone(): string {
    let timezone;
    try {
      timezone = window.nav.preferences.TimeZone;
      if (this._logger) {
        this._logger.info('Using default UTC timezone');
      }
    } catch (ex) {
      timezone = 'UTC';
      if (this._logger) {
        this._logger.error('Using default UTC timezone');
      }
    }
    return timezone;
  }

  private _getWindowNavPreferences(): string {
    if (window && window.nav && window.nav.preferences) {
      return window.nav.preferences.preferredLocale;
    }

    return 'undefined';
  }
}
