import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { DelegateMainComponent } from './components/delegate-main/delegate-main.component';
import { DelegateRegistrationComponent } from './components/delegate-registration/delegate-registration.component';
import { DelegateWithChildComponent } from './components/delegate-with-child/delegate-with-child.component';
import { DelegateOnlineComponent } from './components/delegate-online/delegate-online.component';
import { DelegateRegistrationSeoComponent } from './components/delegate-registration-seo/delegate-registration-seo.component';
import { DelegatePeaceStudentComponent } from './components/delegate-peace-student/delegate-peace-student.component';
import { DelegateRegistrationOnlineComponent } from './components/delegate-registration-online/delegate-registration-online.component';
import { DelegateMessageComponent } from './components/delegate-message/delegate-message.component';
import { DelegatePaymentSuccessComponent } from './components/delegate-payment-success/delegate-payment-success.component';
import { DelegatePaymentFailComponent } from './components/delegate-payment-fail/delegate-payment-fail.component';
import { DelegateWithChildNominationComponent } from './components/delegate-with-child-nomination/delegate-with-child-nomination.component';
import { AmbassadorComponent } from './components/ambassador/ambassador.component';
import { DelegateEmailPaymentComponent } from './components/delegate-email-payment/delegate-email-payment.component';
import { VerifyTicketComponent } from './components/verify-ticket/verify-ticket.component';
import { PeacekeeperComponent } from './components/peacekeeper/peacekeeper.component';
const routes: Routes = [
  {
    path: '',
    component: DelegateMainComponent,

    children:[
      {path:'delegate-registration',component:DelegateRegistrationComponent},
      {path:'delegate-child-nomination',component:DelegateWithChildComponent},
      {path:'delegate-online',component:DelegateOnlineComponent},
      {path:'delegate-ad',component:DelegateRegistrationSeoComponent},
      {path:'delegate-registration-online',component:DelegateRegistrationOnlineComponent},
      {path:'delegate-student',component:DelegatePeaceStudentComponent},
      {path:'delegate-message',component:DelegateMessageComponent},
      {path:'delegate-payment-success',component:DelegatePaymentSuccessComponent},
      {path:'delegate-payment-fail',component:DelegatePaymentFailComponent},
      {path:'delegate-payment-status',component:DelegateMessageComponent},
      {path:'delegate-student-nomination',component:DelegateWithChildNominationComponent},
      {path:'delegate-ad',component:DelegateRegistrationSeoComponent},
      {path:'ambassador/:name', component: AmbassadorComponent },
      {path:'peacekeeper/:name', component: PeacekeeperComponent },
      {path :'delegate-email-payment', component:DelegateEmailPaymentComponent},
      {path :'verify_ticket', component:VerifyTicketComponent},
      {path:'', redirectTo:'/delegate-registration', pathMatch:'full'}
    ]
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class DelegateRoutingModule { }
