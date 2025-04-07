import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { WebHomeComponent } from './web-home/web-home.component';
import { WebMainComponent } from './web-main/web-main.component';
import { TheSummitComponent } from './the-summit/the-summit.component';
import { PartnersComponent } from './partners/partners.component';
import { AwardsComponent } from './awards/awards.component';
import { WorldPeacekeepersMovementComponent } from './world-peacekeepers-movement/world-peacekeepers-movement.component';
import { DownloadCenterComponent } from './download-center/download-center.component';
import { ChairmanCornerComponent } from './chairman-corner/chairman-corner.component';
import { DownloadBrochureComponent } from './download-brochure/download-brochure.component';
import { ContactUsComponent } from './contact-us/contact-us.component';
import { PrivacyPolicyComponent } from './privacy-policy/privacy-policy.component';
import { AccessibilityComponent } from './accessibility/accessibility.component';
import { CookiePolicyComponent } from './cookie-policy/cookie-policy.component';
import { TermsOfUseComponent } from './terms-of-use/terms-of-use.component';
import { VisitorTermsOnditionsComponent } from './visitor-terms-onditions/visitor-terms-onditions.component';
import { HumanValuesComponent } from './blog/human-values/human-values.component';
import { HowToUseSocialMediaComponent } from './blog/how-to-use-social-media/how-to-use-social-media.component';
import { SitemapComponent } from './sitemap/sitemap.component';
import { DownloadApplicationsComponent } from './download-applications/download-applications.component';
import { PeacekeeperPreselectComponent } from './peacekeeper-preselect/peacekeeper-preselect.component';
import { RequestAccountDeletionsComponent } from './request-account-deletions/request-account-deletions.component';
import { CommitteeComponent } from './committee/committee.component';
import { PaymentMainComponent } from './payment-main/payment-main.component';
import { PaymentComponent } from './payment/payment.component';
import { SuccessComponent } from './success/success.component';
import { VideoComponent } from './media/video/video.component';
import { PhotosComponent } from './media/photos/photos.component';
import { NewsPaperComponent } from './media/news-paper/news-paper.component';
import { SpeakerDetailsComponent } from './speaker-details/speaker-details.component';
import { SpeakersProfileComponent } from './speakers-profile/speakers-profile.component';
import { PeaceShopComponent } from './peace-shop/peace-shop.component';
import { PeaceMenuComponent } from './peace-menu/peace-menu.component';
import { PeaceFashionComponent } from './peace-fashion/peace-fashion.component';
import { AboutUsComponent } from './about-us/about-us.component';
import { MetroRouteComponent } from './metro-route/metro-route.component';
const routes: Routes = [
  {
    path: '',
    component: WebMainComponent,

    children: [
      { path: 'home', redirectTo: '', pathMatch: 'full' }, // Redirect /home to /

      { path: '', component: WebHomeComponent, data: { metaKey: 'home' } },
      // {path:'home',component:WebHomeComponent,
      //   data: {
      //     metaKey: 'home'
      //   },
      // },
      {
        path: 'the-summit',
        component: TheSummitComponent,
        data: {
          metaKey: 'the-summit',
        },
      },
      {
        path: 'partners',
        component: PartnersComponent,
        data: {
          metaKey: 'partners',
        },
      },
      {
        path: 'awards',
        component: AwardsComponent,
        data: {
          metaKey: 'awards',
        },
      },
      {
        path: 'world-peacekeepers-movement',
        component: WorldPeacekeepersMovementComponent,
        data: {
          metaKey: 'world-peacekeepers-movement',
        },
      },
      {
        path: 'DownloadCenter',
        component: DownloadCenterComponent,
        data: {
          metaKey: 'DownloadCenter',
        },
      },
      {
        path: 'chairman-corner',
        component: ChairmanCornerComponent,
        data: {
          metaKey: 'chairman-corner',
        },
      },
      // { path: 'download-brochure', component: DownloadBrochureComponent },

      {
        path: 'contact-us',
        component: ContactUsComponent,
        data: {
          metaKey: 'contact-us',
        },
      },

      //footer

      {
        path: 'privacy-policy',
        component: PrivacyPolicyComponent,
        data: {
          metaKey: 'privacy-policy',
        },
      },
      {
        path: 'accessibility',
        component: AccessibilityComponent,
        data: {
          metaKey: 'accessibility',
        },
      },
      {
        path: 'cookie-policy',
        component: CookiePolicyComponent,
        data: {
          metaKey: 'cookie-policy',
        },
      },
      {
        path: 'terms-of-use',
        component: TermsOfUseComponent,
        data: {
          metaKey: 'terms-of-use',
        },
      },
      {
        path: 'visitor-terms-conditions',
        component: VisitorTermsOnditionsComponent,
        data: {
          metaKey: 'visitor-terms-conditions',
        },
      },

      {
        path: 'blog/human-values',
        component: HumanValuesComponent,
      },
      {
        path: 'blog/how-to-use-social-media',
        component: HowToUseSocialMediaComponent,
      },
      {
        path: 'sitemap',
        component: SitemapComponent,
      },
      {
        path: 'download-applications',
        component: DownloadApplicationsComponent,
      },
      {
        path: 'peacekeeper-preselect',
        component: PeacekeeperPreselectComponent,
      },
      {
        path: 'request-account-deletion',
        component: RequestAccountDeletionsComponent,
      },
      {
        path: 'contact-us/working-committee',
        component: CommitteeComponent,
      },

      {
        path: 'media/videos',
        component: VideoComponent,
      },
      {
        path: 'media/photos',
        component: PhotosComponent,
      },
      // {
      //   path: 'media/articles',
      //   component: ArticlesComponent,
      // },
      {
        path: 'media/news-paper',
        component: NewsPaperComponent,
      },

      {
        path: 'speaker-details',
        component: SpeakerDetailsComponent
      },
      {
        path: 'speaker-details/:speakerId/:speakerName',
        component: SpeakersProfileComponent
      },
      {
        path: 'peace-shop',
        component: PeaceShopComponent,
      },
      {
        path: 'peace-menu',
        component: PeaceMenuComponent,
      },
      {
        path: 'peace-fashion',
        component: PeaceFashionComponent,
      },
      {
        path: 'about-us',
        component: AboutUsComponent,
      },

      {
        path: 'metro-route',
        component: MetroRouteComponent,
      },

      { path: '', redirectTo: 'home', pathMatch: 'full' },
    ],
  },
  {
    path: '',
    component: PaymentMainComponent,
    children: [
      { path: 'payment-status', component: PaymentComponent },
      { path: 'success', component: SuccessComponent },
    ],
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class WebRoutingModule {}
