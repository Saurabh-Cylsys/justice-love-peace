import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';

import { SharedRoutingModule } from './shared-routing.module';
import { WebHeaderComponent } from './components/web-header/web-header.component';
import { WebFooterComponent } from './components/web-footer/web-footer.component';
import { MediaHeaderComponent } from './components/media-header/media-header.component';


@NgModule({
  declarations: [
    WebHeaderComponent,
    WebFooterComponent,
    MediaHeaderComponent
  ],
  imports: [
    CommonModule,
    RouterModule,
    SharedRoutingModule
  ],
  exports: [
    WebHeaderComponent,
    WebFooterComponent,
    MediaHeaderComponent,
    RouterModule
  ]
})
export class SharedModule { }
