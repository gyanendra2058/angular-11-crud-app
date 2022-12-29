import { Injectable } from '@angular/core';
import { State, Action, StateContext, Store } from '@ngxs/store';
import { States } from 'src/app/enums/states';
import { TranslateDataService } from 'src/app/translate/translate-data.service';
import { GetTranslations, GotTranslations } from './app.actions';

export class AppStateModel {
  getTranslations!: States;
  
}

const defaults = {
  getTranslations: States.TaskNotStarted
};

@State<AppStateModel>({
  name: 'app',
  defaults
})

@Injectable()
export class AppState {

  constructor(private readonly _translate: TranslateDataService) {

  }

  @Action(GetTranslations)
  getTranslations(ctx: StateContext<AppStateModel>): void {
    try {
      if (this._translate.isLoaded()) {
        ctx.patchState({ getTranslations: States.TranslationsLoaded });
      }

      if (!this._translate.isLoaded()) {
        ctx.patchState({ getTranslations: States.GetTranslationsInProgress });

        this._translate.load(() => {
        });
      }

    } catch (e) {
      ctx.patchState({ getTranslations: States.GetTranslationsFailure });
    }
  }

  @Action(GotTranslations)
  gotTranslations(ctx: StateContext<AppStateModel>): void {
    ctx.patchState({ getTranslations: States.TranslationsLoaded });
  }
  
}
