import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { AlertTemplatesRoutingModule } from './alert-templates-routing.module';
import { AlertTemplatesComponent } from './alert-templates.component';
import { NgxsModule } from '@ngxs/store';
import { AlertTemplatesState } from 'src/app/store/alert-templates/alert-templates.state';

@NgModule({
  declarations: [AlertTemplatesComponent],
  imports: [
    CommonModule,
    AlertTemplatesRoutingModule,
    NgxsModule.forFeature([AlertTemplatesState]),
  ],
})
export class AlertTemplatesModule {}
