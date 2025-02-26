import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { BsDatepickerModule } from 'ngx-bootstrap/datepicker';
import { NgxIntlTelInputModule } from 'ngx-intl-tel-input';
import { IntlInputPhoneModule } from 'intl-input-phone';
import { QRCodeModule } from 'angularx-qrcode';
import { ImageCropperModule } from 'ngx-image-cropper';
import { SwiperModule } from 'swiper/angular';

import { WebRoutingModule } from './web-routing.module';
import { WebHomeComponent } from './web-home/web-home.component';
import { WebMainComponent } from './web-main/web-main.component';
import { SharedModule } from '../../../app/shared/shared.module';
import { CustomePipePipe } from '../../../app/shared/classes/custome-pipe.pipe';

@NgModule({
  declarations: [
    WebHomeComponent,
    WebMainComponent,
    CustomePipePipe
  ],
  imports: [
    CommonModule,
    WebRoutingModule,
    SharedModule,
    FormsModule,
    ReactiveFormsModule,
    NgxIntlTelInputModule,
    QRCodeModule,
    IntlInputPhoneModule,
    ImageCropperModule,
    SwiperModule,
    BsDatepickerModule.forRoot()
  ]
})
export class WebModule { }
