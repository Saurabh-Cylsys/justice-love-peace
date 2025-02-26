import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';

import { SharedRoutingModule } from './shared-routing.module';
import { WebHeaderComponent } from './components/web-header/web-header.component';
import { WebFooterComponent } from './components/web-footer/web-footer.component';


@NgModule({
  declarations: [
    WebHeaderComponent,
    WebFooterComponent,
  ],
  imports: [
    CommonModule,
    RouterModule,
    SharedRoutingModule
  ],
  exports: [
    WebHeaderComponent,
    WebFooterComponent,
    RouterModule
  ]
})
export class SharedModule { }
