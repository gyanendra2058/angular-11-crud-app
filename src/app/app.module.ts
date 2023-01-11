import { BrowserModule } from '@angular/platform-browser';
import { APP_INITIALIZER, NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { HttpClient, HttpClientModule } from '@angular/common/http';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { NgxsModule, NoopNgxsExecutionStrategy, Store } from '@ngxs/store';
import { NgxsReduxDevtoolsPluginModule } from '@ngxs/devtools-plugin';
import { NgxsLoggerPluginModule } from '@ngxs/logger-plugin';
import { environment } from '../environments/environment';
import { TranslateModule, TranslateLoader, TranslateService } from '@ngx-translate/core';

import { NgxsDispatchPluginModule } from '@ngxs-labs/dispatch-decorator';
import { NgxsActionsExecutingModule } from '@ngxs-labs/actions-executing';
import { NgxsSelectSnapshotModule } from '@ngxs-labs/select-snapshot';

import { TranslateHttpLoader } from '@ngx-translate/http-loader';
import { GetTranslations } from './store/app/app.actions';
import { AppState } from './store/app/app.state';

export function httpLoaderFactory(http: HttpClient): TranslateHttpLoader {
  return new TranslateHttpLoader(http, 'assets/i18n/locale_', '.json');
}

export function loadTranslations(store: Store): () => Promise<any> {
  return () => store.dispatch(new GetTranslations()).toPromise();
}
@NgModule({
  declarations: [AppComponent],
  imports: [
    BrowserModule,
    FormsModule,
    HttpClientModule,
    AppRoutingModule,
    // all ngx-translate related modules
    TranslateModule.forRoot({
      loader: {
        provide: TranslateLoader,
        useFactory: httpLoaderFactory,
        deps: [HttpClient],
      },
    }),

    // NGXS related setup
    NgxsModule.forRoot([AppState], {
      executionStrategy: NoopNgxsExecutionStrategy,
    }),
    NgxsSelectSnapshotModule.forRoot(),
    NgxsActionsExecutingModule.forRoot(),
    NgxsDispatchPluginModule.forRoot(),
    NgxsLoggerPluginModule.forRoot({
      disabled: environment.production,
    }),
    NgxsReduxDevtoolsPluginModule.forRoot({
      name: 'TEMPLATE_V2_UI',
      disabled: environment.production,
    }),
  ],
  providers: [
    {
      provide: APP_INITIALIZER,
      useFactory: loadTranslations,
      deps: [Store],
      multi: true,
    },
    TranslateService,
  ],
  bootstrap: [AppComponent],
})
export class AppModule {}
