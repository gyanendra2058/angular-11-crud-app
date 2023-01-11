import { Injectable } from '@angular/core';
import { State, Action, StateContext } from '@ngxs/store';
import { AlertTemplatesAction } from './alert-templates.actions';

export class AlertTemplatesStateModel {
  public items!: string[];
}

const defaults = {
  items: [],
};

@State<AlertTemplatesStateModel>({
  name: 'alertTemplates',
  defaults,
})
@Injectable()
export class AlertTemplatesState {
  @Action(AlertTemplatesAction)
  add(
    { getState, setState }: StateContext<AlertTemplatesStateModel>,
    { payload }: AlertTemplatesAction
  ): void {
    const state = getState();
    setState({ items: [...state.items, payload] });
  }
}
