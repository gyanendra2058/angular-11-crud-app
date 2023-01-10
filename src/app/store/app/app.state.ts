import { Injectable } from '@angular/core';
import { State, Action, StateContext } from '@ngxs/store';
import { Observable, of } from 'rxjs';
import { catchError, tap } from 'rxjs/operators';
import { States } from 'src/app/enums/states';
import { TranslationCollectionService } from 'src/app/services/translation-collection.service';
import { TranslateDataService } from 'src/app/translate/translate-data.service';
import { GetDynamicCollections, GetTranslations } from './app.actions';

export class AppStateModel {
  getTranslations!: States;
  getDynamicCollections!: States;
}

const defaults = {
  getTranslations: States.TaskNotStarted,
  getDynamicCollections: States.TaskNotStarted
};

@State<AppStateModel>({
  name: 'app',
  defaults
})

@Injectable()
export class AppState {

  constructor(private readonly _translate: TranslateDataService, private readonly _dynamicCollectionsService: TranslationCollectionService) {

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

  @Action(GetDynamicCollections)
  getDynamicCollections(ctx: StateContext<AppStateModel>, payload: GetDynamicCollections): Observable<any> {

    ctx.patchState({ getDynamicCollections: States.DynamicCollectionsLoadStart });

    return this._dynamicCollectionsService.getTranslationCollection(payload.lang).pipe(
      tap((data: any) => {
        TranslationCollectionService.setValue(new Map(Object.entries(data)));
        TranslationCollectionService.getValue('FORM`actions');
        ctx.patchState({ getDynamicCollections: States.DynamicCollectionsLoadSuccess });
      }),

      catchError(() => {
        TranslationCollectionService.setValue(new Map(Object.entries({})))
        ctx.patchState({ getDynamicCollections: States.DynamicCollectionsLoadFailure });
        return of([]);
      }));
  }

}
