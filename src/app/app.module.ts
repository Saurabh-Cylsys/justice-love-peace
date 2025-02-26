import { NgModule } from '@angular/core';
import { BrowserModule, provideClientHydration } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';

// import { BrowserModule } from '@angular/platform-browser';
// import { AuthModule } from './features/auth/auth.module';
// import { NgxUiLoaderModule } from 'ngx-ui-loader';
// import { HashLocationStrategy, LocationStrategy } from '@angular/common';

// import { SharedModule } from './shared/shared.module';


// import { HeaderComponent } from './shared/components/header/header.component';
// import { FormsModule,ReactiveFormsModule } from '@angular/forms';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { DatePipe } from '@angular/common';
import { ToastrModule } from 'ngx-toastr';
import { provideAnimations } from '@angular/platform-browser/animations';
import { Constants } from './config/constant';
import { HttpClientModule, HttpClient } from '@angular/common/http';
import { SharedModule } from './shared/shared.module';
// import { QRCodeModule } from 'angularx-qrcode';
// import { BsDatepickerModule } from 'ngx-bootstrap/datepicker';

@NgModule({
  declarations: [
    AppComponent,
  ],
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    HttpClientModule,
    BrowserAnimationsModule,
    ToastrModule.forRoot(),
    SharedModule,
    BrowserModule,
    // NgxUiLoaderModule,
    AppRoutingModule,
    FormsModule, ReactiveFormsModule,SharedModule,
    // QRCodeModule,
    // BsDatepickerModule.forRoot()

  ],
  providers: [
    provideClientHydration()
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
