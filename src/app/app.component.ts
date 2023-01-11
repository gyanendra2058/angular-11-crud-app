import {
  Compiler,
  Component,
  Injector,
  NgModuleFactory,
  OnInit,
  ViewChild,
  ViewContainerRef,
} from '@angular/core';
import { Event, NavigationEnd, Router } from '@angular/router';
import { Dispatch } from '@ngxs-labs/dispatch-decorator';
import { GetDynamicCollections } from './store/app/app.actions';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
})
export class AppComponent implements OnInit {
  @ViewChild('mainContainer', { read: ViewContainerRef })
  container!: ViewContainerRef;

  constructor(
    private _compiler: Compiler,
    private _injector: Injector,
    private readonly _router: Router
  ) {
    this._router.events.subscribe(
      async (routeEvent: Event) => await this._loadTemplatesModuleDynamically(routeEvent)
    );
  }

  @Dispatch() getDynamicCollections = (lang: string): unknown => new GetDynamicCollections(lang);
  ngOnInit(): void {
    this.getDynamicCollections('en-US');
  }

  private async _loadTemplatesModuleDynamically(routeEvent: Event): Promise<void> {
    if (routeEvent instanceof NavigationEnd) {
      if (routeEvent.url === '/#/alerts') {
        await this._loadAlertTemplatesModule();
      } else if (routeEvent.url === '/#/cases') {
        await this._loadCaseTemplatesModule();
      } else {
        // TODO: Load page not found
      }
    }
  }

  async _loadAlertTemplatesModule(): Promise<void> {
    const { AlertTemplatesModule } = await import(
      './components/alert-templates/alert-templates.module'
    );

    const { AlertTemplatesComponent } = await import(
      './components/alert-templates/alert-templates.component'
    );
    const moduleFactory = await this.loadModuleFactory(AlertTemplatesModule);
    const moduleRef = moduleFactory.create(this._injector);
    const factory =
      moduleRef.componentFactoryResolver.resolveComponentFactory(AlertTemplatesComponent);
    this.container.createComponent(factory);
  }

  async _loadCaseTemplatesModule(): Promise<void> {
    const { CaseTemplatesModule } = await import(
      './components/case-templates/case-templates.module'
    );

    const { CaseTemplatesComponent } = await import(
      './components/case-templates/case-templates.component'
    );
    const moduleFactory = await this.loadModuleFactory(CaseTemplatesModule);
    const moduleRef = moduleFactory.create(this._injector);
    const factory =
      moduleRef.componentFactoryResolver.resolveComponentFactory(CaseTemplatesComponent);
    this.container.createComponent(factory);
  }

  private async loadModuleFactory(t: any) : Promise<any> {
    if (t instanceof NgModuleFactory) {
      return t;
    } else {
      return await this._compiler.compileModuleAsync(t);
    }
  }
}
