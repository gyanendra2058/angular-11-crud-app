import { Injectable } from '@angular/core';
import { Action, State, StateContext } from '@ngxs/store';
import { produce } from 'immer';
import { Observable } from 'rxjs';
import { tap } from 'rxjs/operators';
import { GridData } from 'src/app/models/grid-data';
import { TemplatesGridService } from 'src/app/services/templates.grid.service';
import { RequestParams } from 'src/app/types/request-params';
import { AlertTemplatesAction, LoadGridData, UpdateCurrentPage } from './alert-templates.actions';

export class AlertTemplatesStateModel {
  public items!: string[];
  public gridData!: GridData | null;
  public currentPage!: number;
}

const defaults = {
  items: [],
  gridData: { data: [], totalCount: -1 },
  currentPage: 0,
};

@State<AlertTemplatesStateModel>({
  name: 'alertTemplates',
  defaults,
})
@Injectable()
export class AlertTemplatesState {
  constructor(private _templatesGridService: TemplatesGridService) {}
  @Action(AlertTemplatesAction)
  add(
    { getState, patchState }: StateContext<AlertTemplatesStateModel>,
    { payload }: AlertTemplatesAction
  ): void {
    const state = getState();
    patchState({ items: [...state.items, payload] });
  }

  @Action(UpdateCurrentPage)
  UpdateCurrentPage(ctx: StateContext<AlertTemplatesStateModel>, action: UpdateCurrentPage): void {
    ctx.setState(
      produce((draft: AlertTemplatesStateModel) => {
        draft.currentPage = action.pageNumber;
      })
    );
  }

  @Action(LoadGridData)
  LoadGridData(
    ctx: StateContext<AlertTemplatesStateModel>,
    action: LoadGridData
  ): Observable<GridData> {
    const { pageSize, pageNumber } = action;
    const requestParams: RequestParams = {
      queryParams: {
        size: pageSize,
        page: pageNumber,
        sortField: 'createdOn',
        sortOrder: 'DESC',
      },
      payload: {
        defaultFilterSet: false,
        filters: [],
        name: 'ALERT',
      },
    };

    return this._templatesGridService.getGridData('ALERT', requestParams).pipe(
      tap((data: GridData) => {
        ctx.setState(
          produce((draft: AlertTemplatesStateModel) => {
            draft.gridData = data;
            draft.currentPage = action.pageNumber + 1;
          })
        );
      })
    );
  }
}
