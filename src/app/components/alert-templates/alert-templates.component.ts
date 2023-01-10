import { AfterViewInit, ChangeDetectionStrategy, Component, ElementRef, OnInit, Renderer2, ViewChild } from '@angular/core';
import { LoadOptions } from 'devextreme/data';
declare let DevExpress: any;

interface DataGridComponent extends HTMLElement {
  configOptionsCB: any,
}

@Component({
  selector: 'app-alert-templates',
  templateUrl: './alert-templates.component.html',
  styleUrls: ['./alert-templates.component.css'],
  changeDetection: ChangeDetectionStrategy.OnPush
})

export class AlertTemplatesComponent implements OnInit, AfterViewInit {
  @ViewChild('alertTemplates') datagridComponentRef!: ElementRef<DataGridComponent>;

  constructor(private renderer: Renderer2
  ) { }

  ngOnInit(): void { }

  ngAfterViewInit() {
    this.renderer.setProperty(this.datagridComponentRef.nativeElement, 'configOptionsCB', this.getDataGridConfig());
  }

  getDataGridConfig(): any {
    const columns = this.getAttributeColumns();
    const config = {
      dataSource: new DevExpress.data.CustomStore({
        pageSize: 50,
        load: this.loadAlertTemplates.bind(this)
      }),
      columns
    };
    return config;
  }

  loadAlertTemplates(loadOptions: LoadOptions) {
    console.log(loadOptions)
    return Promise.resolve([])
  }

  getAttributeColumns() {
    const metaInfo: Array<any> = [{
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
    }
    ];

    return metaInfo
  }
}
