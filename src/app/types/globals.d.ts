import { AlertTemplatesStateModel } from '../store/alert-templates/alert-templates.state';
import { AppStateModel } from '../store/app/app.state';

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

  interface AppGlobalState {
    app: AppStateModel;
    alertTemplates: AlertTemplatesStateModel;
  }
}
