import { TranslateModule, TranslateService } from '@ngx-translate/core';
import { NgxsModule, Store } from '@ngxs/store';
import { LogService } from './log.service';
import { TestBed } from '@angular/core/testing';
import clearAllMocks = jest.clearAllMocks;
import { TranslateDataService } from './translate-data.service';

/* eslint-disable dot-notation, @typescript-eslint/dot-notation */
describe('Translate Data Service Tests', () => {
  let translateDataService: TranslateDataService;
  let translateService: any;
  let logService: any;
  let store: any;

  beforeAll(() => {
    TestBed.configureTestingModule({
      imports: [TranslateModule.forRoot(), NgxsModule.forRoot()],
      providers: [
        TranslateDataService,
        LogService,
        Store,
        {
          provide: TranslateService,
          useValue: {
            getLangs: jest.fn(),
            getBrowserCultureLang: jest.fn(),
            instant: jest.fn(),
            setDefaultLang: jest.fn(),
            use: jest.fn(),
          },
        },
      ],
    }).compileComponents();

    translateService = TestBed.inject(TranslateService);
    logService = TestBed.inject(LogService);
    store = TestBed.inject(Store);
    translateDataService = TestBed.inject(TranslateDataService);
  });

  afterAll(() => {
    clearAllMocks();
  });

  test('should be created', () => {
    expect(translateDataService).toBeTruthy();
  });

  describe('isLoaded() tests', () => {
    test('returns true if getLangs from TranslateService is > 0', () => {
      // Arrange
      translateService.getLangs.mockReturnValue(['en-US']);

      // Act
      const actual = translateDataService.isLoaded();

      // Assert
      expect(actual).toBeTruthy();
    });

    test('returns false if getLangs from TranslateService is <= 0', () => {
      // Arrange
      translateService.getLangs.mockReturnValue([]);

      // Act
      const actual = translateDataService.isLoaded();

      // Assert
      expect(actual).toBeFalsy();
    });
  });

  describe('get() tests', () => {
    test('returns whatever translateService instant returns', () => {
      // Arrange
      const returnedValue = 'test';
      translateService.instant.mockReturnValue(returnedValue);

      // Act
      const actual = translateDataService.get('App.Any.Key');

      // Assert
      expect(actual).toBe(returnedValue);
    });
  });

  describe('load() tests', () => {
    test('callback function is called when translations are loaded', () => {
      // Arrange
      const callback = jest.fn();
      translateService.getLangs.mockReturnValue(['en-US']);

      // Act
      translateDataService.load(callback);

      // Assert
      expect(callback).toHaveBeenCalled();
    });

    test('getLangs is called multiple times to check if translations are loaded', (done) => {
      // Arrange
      const callback = jest.fn();
      translateService.getLangs
        .mockReturnValueOnce([])
        .mockReturnValueOnce([])
        .mockReturnValueOnce([])
        .mockReturnValueOnce([])
        .mockReturnValueOnce([])
        .mockReturnValueOnce(['en-US']);

      // Act
      translateDataService.load(callback);

      // Assert
      setTimeout(() => {
        const noOfTimesMethodCalled = translateService.getLangs.mock.calls.length;
        expect(callback).toHaveBeenCalled();
        expect(noOfTimesMethodCalled).toBeGreaterThanOrEqual(6);
        done();
      }, 650);
    });
  });

  describe('locale() tests', () => {
    test('locale is set to window.nav.preferences.preferredLocale', () => {
      // Arrange
      window['nav'] = {
        preferences: {
          preferredLocale: 'en-US',
        },
      };

      // Act
      const tds = new TranslateDataService(translateService, logService, store);

      // Assert
      expect(tds.locale).toBe('en-US');
    });

    test('locale is set to translateService.getBrowserCultureLang if window.nav.preferences.preferredLocale is EMPTY', () => {
      // Arrange
      window['nav'] = {
        preferences: {
          preferredLocale: '',
        },
      };
      translateService.getBrowserCultureLang.mockReturnValue('fr-FR');

      // Act
      const tds = new TranslateDataService(translateService, logService, store);

      // Assert
      expect(tds.locale).toBe('fr-FR');
    });
  });
});
