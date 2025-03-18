import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { DelegateRoutingModule } from './delegate-routing.module';
import { DelegateMainComponent } from './components/delegate-main/delegate-main.component';
import { DelegateRegistrationComponent } from './components/delegate-registration/delegate-registration.component';
import { SharedModule } from '../../../app/shared/shared.module';
import { NgxIntlTelInputModule } from 'ngx-intl-tel-input';
import { IntlInputPhoneModule } from 'intl-input-phone';
import { BsDatepickerModule } from 'ngx-bootstrap/datepicker';
import { DelegateWithChildComponent } from './components/delegate-with-child/delegate-with-child.component';
import { DelegateOnlineComponent } from './components/delegate-online/delegate-online.component';
import { DelegateRegistrationSeoComponent } from './components/delegate-registration-seo/delegate-registration-seo.component';
import { DelegateRegistrationOnlineComponent } from './components/delegate-registration-online/delegate-registration-online.component';
import { DelegatePeaceStudentComponent } from './components/delegate-peace-student/delegate-peace-student.component';
import { DelegateMessageComponent } from './components/delegate-message/delegate-message.component';
import { DelegatePaymentSuccessComponent } from './components/delegate-payment-success/delegate-payment-success.component';
import { DelegatePaymentFailComponent } from './components/delegate-payment-fail/delegate-payment-fail.component';
import { DelegateWithChildNominationComponent } from './components/delegate-with-child-nomination/delegate-with-child-nomination.component';
import { AmbassadorComponent } from './components/ambassador/ambassador.component';
@NgModule({
  declarations: [
    DelegateMainComponent,
    DelegateRegistrationComponent,
    DelegateWithChildComponent,
    DelegateOnlineComponent,
    DelegateRegistrationSeoComponent,
    DelegateRegistrationOnlineComponent,
    DelegatePeaceStudentComponent,
    DelegateMessageComponent,
    DelegatePaymentSuccessComponent,
    DelegatePaymentFailComponent,
    DelegateWithChildNominationComponent,
    AmbassadorComponent
  ],
  imports: [
    CommonModule,
    ReactiveFormsModule,
    FormsModule,
    DelegateRoutingModule,
    SharedModule,
    NgxIntlTelInputModule,
    IntlInputPhoneModule,
    BsDatepickerModule.forRoot()
  ]
})
export class DelegateModule { }
