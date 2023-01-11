import {
  AfterViewInit,
  ChangeDetectionStrategy,
  Component,
  ElementRef,
  Renderer2,
  ViewChild,
} from '@angular/core';
import { LoadOptions } from 'devextreme/data';
declare let DevExpress: any;

interface DataGridComponent extends HTMLElement {
  configOptionsCB: any;
}

@Component({
  selector: 'app-alert-templates',
  templateUrl: './alert-templates.component.html',
  styleUrls: ['./alert-templates.component.css'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class AlertTemplatesComponent implements AfterViewInit {
  @ViewChild('alertTemplates') datagridComponentRef!: ElementRef<DataGridComponent>;

  constructor(private renderer: Renderer2) {}

  ngAfterViewInit(): void {
    this.renderer.setProperty(
      this.datagridComponentRef.nativeElement,
      'configOptionsCB',
      this.getDataGridConfig()
    );
  }

  getDataGridConfig(): unknown {
    const columns = this.getAttributeColumns();
    const config = {
      dataSource: new DevExpress.data.CustomStore({
        pageSize: 50,
        load: this.loadAlertTemplates.bind(this),
      }),
      columns,
    };
    return config;
  }

  loadAlertTemplates(loadOptions: LoadOptions): Promise<Array<unknown>> {
    console.log(loadOptions);
    return Promise.resolve([]);
  }

  // eslint-disable-next-line @typescript-eslint/explicit-module-boundary-types
  getAttributeColumns() {
    const metaInfo: Array<unknown> = [
      {
        caption: 'ID',
        dataType: 'string',
        showInGrid: true,
        visible: true,
      },
      {
        caption: 'Name',
        dataType: 'string',
        showInGrid: true,
        visible: true,
      },
      {
        caption: 'Description',
        dataType: 'string',
        showInGrid: true,
        visible: true,
      },
      {
        caption: 'Severity',
        dataType: 'string',
        showInGrid: true,
        visible: true,
      },
      {
        caption: 'Source',
        dataType: 'string',
        showInGrid: true,
        visible: true,
      },
      {
        caption: 'Type',
        dataType: 'string',
        showInGrid: true,
        visible: true,
      },
      {
        caption: 'Created On',
        dataType: 'datetime',
        showInGrid: true,
        visible: true,
      },
      {
        caption: 'Updated On',
        dataType: 'datetime',
        showInGrid: true,
        visible: true,
      },
    ];

    return metaInfo;
  }
}
