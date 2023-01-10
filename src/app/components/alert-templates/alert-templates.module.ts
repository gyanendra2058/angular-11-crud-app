import { CUSTOM_ELEMENTS_SCHEMA, NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { AlertTemplatesRoutingModule } from './alert-templates-routing.module';
import { AlertTemplatesComponent } from './alert-templates.component';
import { NgxsModule } from '@ngxs/store';
import { AlertTemplatesState } from 'src/app/store/alert-templates/alert-templates.state';
import { TranslateModule } from '@ngx-translate/core';

@NgModule({
  declarations: [AlertTemplatesComponent],
  imports: [
    CommonModule,
    TranslateModule,
    AlertTemplatesRoutingModule,
    NgxsModule.forFeature([AlertTemplatesState]),
  ],
  schemas: [
    CUSTOM_ELEMENTS_SCHEMA
  ]
})
export class AlertTemplatesModule {}
