import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { WebHomeComponent } from './web-home/web-home.component';
import { WebMainComponent } from './web-main/web-main.component';

const routes: Routes = [
  {
    path: '',
    component: WebMainComponent,
    children: [
      { path: 'home', redirectTo: '', pathMatch: 'full' },
      { path: '', component: WebHomeComponent, data: { metaKey: 'home' } },
      { path: '', redirectTo: 'home', pathMatch: 'full' },
    ],
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class WebRoutingModule {}
