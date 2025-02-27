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
@NgModule({
  declarations: [
    DelegateMainComponent,
    DelegateRegistrationComponent,
    DelegateWithChildComponent
  ],
  imports: [
    CommonModule,
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
