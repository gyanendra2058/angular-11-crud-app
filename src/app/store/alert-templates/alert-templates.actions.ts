import { LoadOptions } from 'devextreme/data';

export class AlertTemplatesAction {
  static readonly type = '[AlertTemplates] Add item';
  constructor(public payload: string) {}
}

export class UpdateCurrentPage {
  static readonly type = '[AlertTemplates] Update Current Page';
  constructor(public pageNumber: number) {}
}

export class ResetGridParams {
  static readonly type = '[AlertTemplates] Reset Grid Params';
}

export class LoadGridData {
  static readonly type = '[AlertTemplates] Load Grid Data';
  constructor(
    public loadOptions: LoadOptions | undefined,
    public pageNumber: number,
    public pageSize: number
  ) {}
}
