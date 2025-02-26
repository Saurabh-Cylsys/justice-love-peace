import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { WebRoutingModule } from './web-routing.module';
import { WebHomeComponent } from './web-home/web-home.component';
import { WebMainComponent } from './web-main/web-main.component';
import { SharedModule } from '../../../app/shared/shared.module';
// import { WorldPeacekeepersMovementComponent } from './world-peacekeepers-movement/world-peacekeepers-movement.component';
import { NgxIntlTelInputModule } from 'ngx-intl-tel-input';
import { IntlInputPhoneModule } from 'intl-input-phone';
import { QRCodeModule } from 'angularx-qrcode';
import { ImageCropperModule } from 'ngx-image-cropper';
import { BsDatepickerModule } from 'ngx-bootstrap/datepicker';
import { CustomePipePipe } from '../../../app/shared/classes/custome-pipe.pipe';
import { SwiperModule } from 'swiper/angular';


@NgModule({
  declarations: [
    WebHomeComponent,
    // DownloadCenterComponent,
    WebMainComponent,
    // AwardsComponent,
    // TheSummitComponent,
    // PartnersComponent,
    // WorldPeacekeepersMovementComponent,
    // ContactUsComponent,
    // PrivacyPolicyComponent,
    // AccessibilityComponent,
    // CookiePolicyComponent,
    // TermsOfUseComponent,
    // VisitorTermsOnditionsComponent,
    // ChairmanCornerComponent,
    // DownloadBrochureComponent,
    // PaymentMainComponent,
    // PaymentComponent,
    // SuccessComponent,
    // PaymentCancelComponent,
    CustomePipePipe,
    // HumanValuesComponent,
    // HowToUseSocialMediaComponent,
    // SitemapComponent,
    // DownloadApplicationsComponent,
    // PeacekeeperPreselectComponent,
    // RequestAccountDeletionsComponent,
    // CommitteeComponent

    // WhoShouldAttendAndWhyComponent,

  ],
  imports: [
    CommonModule,
    WebRoutingModule,
    SharedModule,
    FormsModule,
   ReactiveFormsModule,
    NgxIntlTelInputModule ,
    QRCodeModule,
   IntlInputPhoneModule,
   ImageCropperModule,
   SwiperModule,
   BsDatepickerModule.forRoot()
  ]
})
export class WebModule { }
