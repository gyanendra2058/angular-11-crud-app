import { Injectable } from '@angular/core';
import { Dispatch } from '@ngxs-labs/dispatch-decorator';
import { Select } from '@ngxs/store';
import { LoadOptions } from 'devextreme/data';
import DataSource from 'devextreme/data/data_source';
import { Observable, Subject } from 'rxjs';
import { take } from 'rxjs/operators';
import { LoadGridData } from 'src/app/store/alert-templates/alert-templates.actions';
import { DataSourceEvent } from 'src/app/types/data-source-events';
import { GridData } from '../../../models/grid-data';
declare let DevExpress: any;

@Injectable()
export class TemplatesGridDataSource {
  @Select((state: AppGlobalState) => state.alertTemplates.gridData)
  gridData$!: Observable<GridData>;

  private dataSource!: DataSource | null;
  private dataSourceEvents$ = new Subject<DataSourceEvent>();

  getSourceEventEmitter(): Subject<DataSourceEvent> {
    return this.dataSourceEvents$;
  }

  getSource(): DataSource | null {
    if (!this.dataSource) {
      this._initializeDataSource();
    }
    return this.dataSource;
  }

  _initializeDataSource(): void {
    this.dataSource = new DevExpress.data.DataSource({
      key: 'uuid',
      pageSize: 50,
      load: this._loadData.bind(this),
    });

    if (this.dataSource !== null) {
      this.dataSource.on('changed', () => {
        this.dataSourceEvents$.next({ eventName: 'updateSortMode', sortMode: 'single' });
      });
    }
  }

  _loadData(loadOptions: LoadOptions): Promise<any> {
    const loadDataPromise = this.gridData$
      .pipe(take(2))
      .toPromise()
      .then(({ data, totalCount }) => ({ data, totalCount }));

    this.dataSourceEvents$.next({ eventName: 'loadGridData', loadOptions });
    return loadDataPromise;
  }

  @Dispatch()
  dispatchLoadAction(
    loadOptions: LoadOptions | undefined,
    pageNumber: number,
    pageSize: number
  ): LoadGridData {
    return new LoadGridData(loadOptions, pageNumber, pageSize);
  }

  public clearDS(): void {
    this.dataSource = null;
  }
}
