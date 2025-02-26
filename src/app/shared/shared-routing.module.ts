import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { WebHeaderComponent } from './components/web-header/web-header.component';
import { WebFooterComponent } from './components/web-footer/web-footer.component';

const routes: Routes = [
  {
    path: 'webheader',
    component: WebHeaderComponent,
    children: [
      { path: 'footer', component: WebFooterComponent },
      { path: '', redirectTo: 'footer', pathMatch: 'full' }
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class SharedRoutingModule { }
