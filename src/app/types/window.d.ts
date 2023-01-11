export {};

declare global {
  interface Window {
    nav: {
      preferences: {
        TimeZone: 'string';
        preferredLocale: 'string';
      };
    };
  }
}
