import { LoadOptions } from 'devextreme/data';

export type DataSourceEvent = {
  eventName: string;
  sortMode?: string;
  loadOptions?: LoadOptions;
};
