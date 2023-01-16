import {
  AfterViewInit,
  ChangeDetectionStrategy,
  Component,
  ElementRef,
  OnDestroy,
  OnInit,
  Renderer2,
  ViewChild,
} from '@angular/core';
import { LoadOptions } from 'devextreme/data';
import DataSource from 'devextreme/data/data_source';
import { Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';
import { TemplatesGridDataSource } from './grid/datagrid.source';

interface DataGridComponent extends HTMLElement {
  configOptionsCB: any;
  getGridInstance: any;
}

@Component({
  selector: 'app-alert-templates',
  templateUrl: './alert-templates.component.html',
  styleUrls: ['./alert-templates.component.css'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class AlertTemplatesComponent implements OnInit, AfterViewInit, OnDestroy {
  @ViewChild('alertTemplates') datagridComponentRef!: ElementRef<DataGridComponent>;
  datagridComponent!: DataGridComponent;
  gridDataSource!: DataSource | null;
  private readonly destroy$ = new Subject();

  constructor(private renderer: Renderer2, private _gridDataSource: TemplatesGridDataSource) {}

  ngOnInit(): void {
    this._setupGridSource();
  }

  ngAfterViewInit(): void {
    this.datagridComponent = this.datagridComponentRef.nativeElement;
    this.renderer.setProperty(this.datagridComponent, 'configOptionsCB', this.getDataGridConfig());
  }

  getDataGridConfig(): unknown {
    const columns = this.getAttributeColumns();
    return {
      dataSource: this.gridDataSource,
      paging: {
        pageSize: 50,
      },
      columnChooserMode: ['select', 'advanced'],
      remoteOperations: {
        paging: true,
        sorting: true,
        filtering: true,
        grouping: true,
        summary: true,
      },
      pager: {
        showPageSizeSelector: true,
        allowedPageSizes: [50, 100, 150, 200],
      },
      columns,
    };
  }

  private _setupGridSource(): void {
    this.gridDataSource = this._gridDataSource.getSource();
    const sourceEventEmitter$ = this._gridDataSource.getSourceEventEmitter();

    sourceEventEmitter$.pipe(takeUntil(this.destroy$)).subscribe(({ eventName, loadOptions }) => {
      if (eventName === 'loadGridData') {
        this._updatePageNumberAndLoad(loadOptions);
      } else if (eventName === 'updateSortMode') {
        //this.datagridComponent.getGridInstance().option('sorting.mode', options.sortMode);
      } else if (eventName === 'clearSorting') {
        //this.datagridComponent.getGridInstance().clearSorting();
      }
    });
  }

  _updatePageNumberAndLoad(loadOptions: LoadOptions | undefined): void {
    const pageNumber = this.datagridComponent.getGridInstance().pageIndex();
    const gridInstance = this.datagridComponent.getGridInstance();

    this._gridDataSource.dispatchLoadAction(
      loadOptions,
      pageNumber,
      gridInstance.option('paging.pageSize')
    );
  }
  // eslint-disable-next-line @typescript-eslint/explicit-module-boundary-types
  getAttributeColumns() {
    const metaInfo: Array<unknown> = [
      {
        caption: 'ID',
        dataType: 'string',
        showInGrid: true,
        visible: true,
        dataField: 'id',
        width: 'auto',
        filterOperations: [],
      },
      {
        caption: 'Name',
        dataType: 'string',
        showInGrid: true,
        visible: true,
        dataField: 'name',
        filterOperations: [],
        width: 220,
      },
      {
        caption: 'Description',
        dataType: 'string',
        showInGrid: true,
        visible: true,
        dataField: 'description',
        filterOperations: [],
        width: 220,
      },
      {
        caption: 'Severity',
        dataType: 'string',
        showInGrid: true,
        visible: true,
        dataField: 'severity',
        filterOperations: [],
        width: 'auto',
      },
      {
        caption: 'Source',
        dataType: 'string',
        showInGrid: true,
        visible: true,
        dataField: 'source.name',
        filterOperations: [],
        width: 220,
      },
      {
        caption: 'Type',
        dataType: 'string',
        showInGrid: true,
        visible: true,
        dataField: 'type.name',
        filterOperations: [],
        width: 220,
      },
      {
        caption: 'Created On',
        dataType: 'datetime',
        showInGrid: true,
        visible: true,
        dataField: 'createdOn',
        filterOperations: [],
        width: 'auto',
      },
      {
        caption: 'Updated On',
        dataType: 'datetime',
        showInGrid: true,
        visible: true,
        dataField: 'updatedOn',
        filterOperations: [],
        width: 'auto',
      },
    ];

    return metaInfo;
  }

  ngOnDestroy(): void {
    this._gridDataSource.clearDS();
    this.destroy$.next();
    this.destroy$.complete();
  }
}
