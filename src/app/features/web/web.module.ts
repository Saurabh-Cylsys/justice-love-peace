import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';
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
import { TheSummitComponent } from './the-summit/the-summit.component';
import { WorldPeacekeepersMovementComponent } from './world-peacekeepers-movement/world-peacekeepers-movement.component';
import { RequestAccountDeletionsComponent } from './request-account-deletions/request-account-deletions.component';
import { DownloadCenterComponent } from './download-center/download-center.component';
import { AwardsComponent } from './awards/awards.component';
import { PartnersComponent } from './partners/partners.component';
import { ContactUsComponent } from './contact-us/contact-us.component';
import { PrivacyPolicyComponent } from './privacy-policy/privacy-policy.component';
import { AccessibilityComponent } from './accessibility/accessibility.component';
import { CookiePolicyComponent } from './cookie-policy/cookie-policy.component';
import { TermsOfUseComponent } from './terms-of-use/terms-of-use.component';
import { VisitorTermsOnditionsComponent } from './visitor-terms-onditions/visitor-terms-onditions.component';
import { ChairmanCornerComponent } from './chairman-corner/chairman-corner.component';
import { DownloadBrochureComponent } from './download-brochure/download-brochure.component';
import { PaymentMainComponent } from './payment-main/payment-main.component';
import { PaymentComponent } from './payment/payment.component';
import { SuccessComponent } from './success/success.component';
import { PaymentCancelComponent } from './payment-cancel/payment-cancel.component';
import { HumanValuesComponent } from './blog/human-values/human-values.component';
import { HowToUseSocialMediaComponent } from './blog/how-to-use-social-media/how-to-use-social-media.component';
import { SitemapComponent } from './sitemap/sitemap.component';
import { DownloadApplicationsComponent } from './download-applications/download-applications.component';
import { PeacekeeperPreselectComponent } from './peacekeeper-preselect/peacekeeper-preselect.component';
import { SpeakerDetailsComponent } from './speaker-details/speaker-details.component';
import { SpeakersProfileComponent } from './speakers-profile/speakers-profile.component';
import { CommitteeComponent } from './committee/committee.component';
import { VideoComponent } from './media/video/video.component';
import { PhotosComponent } from './media/photos/photos.component';
import { ArticlesComponent } from './media/articles/articles.component';
import { NewsPaperComponent } from './media/news-paper/news-paper.component';
import { PeaceFashionComponent } from './peace-fashion/peace-fashion.component';
import { PeaceMenuComponent } from './peace-menu/peace-menu.component';
import { PeaceShopComponent } from './peace-shop/peace-shop.component';
import { AboutUsComponent } from './about-us/about-us.component';
import { MetroRouteComponent } from './metro-route/metro-route.component';
import { AuctionComponent } from './auction/auction.component';
import { StayTunedComponent } from './stay-tuned/stay-tuned.component';
import { GalleryComponent } from './media/gallery/gallery.component';
import { PeacekeeperPaymentSuccessComponent } from './peacekeeper-payment-success/peacekeeper-payment-success.component';
import { PeacekeeperPaymentFailComponent } from './peacekeeper-payment-fail/peacekeeper-payment-fail.component';
// import { PhotoGalleryComponent } from './photo-gallery/photo-gallery.component';
import { IAmPeacekeeperMovementComponent } from './i-am-peacekeeper-movement/i-am-peacekeeper-movement.component';

@NgModule({
  declarations: [
    WebHomeComponent,
    DownloadCenterComponent,
    WebMainComponent,
    AwardsComponent,
    TheSummitComponent,
    PartnersComponent,
    WorldPeacekeepersMovementComponent,
    ContactUsComponent,
    PrivacyPolicyComponent,
    AccessibilityComponent,
    CookiePolicyComponent,
    TermsOfUseComponent,
    VisitorTermsOnditionsComponent,
    ChairmanCornerComponent,
    DownloadBrochureComponent,
    PaymentMainComponent,
    PaymentComponent,
    SuccessComponent,
    PaymentCancelComponent,
    CustomePipePipe,
    HumanValuesComponent,
    HowToUseSocialMediaComponent,
    SitemapComponent,
    DownloadApplicationsComponent,
    PeacekeeperPreselectComponent,
    RequestAccountDeletionsComponent,
    CommitteeComponent,
    VideoComponent,
    PhotosComponent,
    ArticlesComponent,
    NewsPaperComponent,
    SpeakerDetailsComponent,
    SpeakersProfileComponent,
    PeaceFashionComponent,
    PeaceMenuComponent,
    PeaceShopComponent,
    AboutUsComponent,
    MetroRouteComponent,
    AuctionComponent,
    StayTunedComponent,
    GalleryComponent,
    PeacekeeperPaymentSuccessComponent,
    PeacekeeperPaymentFailComponent,
    // PhotoGalleryComponent,
    IAmPeacekeeperMovementComponent
  ],
  imports: [
    CommonModule,
    WebRoutingModule,
    SharedModule,
    FormsModule,
    ReactiveFormsModule,
    RouterModule,
    NgxIntlTelInputModule,
    QRCodeModule,
    IntlInputPhoneModule,
    ImageCropperModule,
    SwiperModule,
    BsDatepickerModule.forRoot()
  ]
})
export class WebModule { }
