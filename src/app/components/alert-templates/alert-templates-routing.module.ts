import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AlertTemplatesComponent } from './alert-templates.component';

const routes: Routes = [
  {
    path: '',
    component: AlertTemplatesComponent,
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class AlertTemplatesRoutingModule {}
