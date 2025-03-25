import { NgModule, ErrorHandler } from '@angular/core';
import { BrowserModule, provideClientHydration } from '@angular/platform-browser';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { DatePipe } from '@angular/common';
import { ToastrModule } from 'ngx-toastr';
import { provideAnimations } from '@angular/platform-browser/animations';
import { Constants } from './config/constant';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { SharedModule } from './shared/shared.module';
import { provideToastr } from 'ngx-toastr';
import { NgxUiLoaderModule, NgxUiLoaderConfig, SPINNER } from 'ngx-ui-loader';

// Add new class for global error handling
export class GlobalErrorHandler implements ErrorHandler {
  handleError(error: any) {
    console.error('An error occurred:', error);
    // You can add more error handling logic here
  }
}

const ngxUiLoaderConfig: NgxUiLoaderConfig = {
  bgsColor: '#00ACC1',
  bgsOpacity: 0.5,
  bgsPosition: 'bottom-right',
  bgsSize: 0,
  blur: 5,
  delay: 0,
  fastFadeOut: true,
  fgsColor: '#00ACC1',
  fgsPosition: 'center-center',
  fgsSize: 0,
  gap: 24,
  logoPosition: 'center-center',
  logoSize: 120,
  logoUrl: 'assets/UIComponents/images/loader.gif',
  masterLoaderId: 'master',
  overlayBorderRadius: '0',
  overlayColor: 'rgba(40, 40, 40, 0.8)',
  pbColor: '#00ACC1',
  pbDirection: 'ltr',
  pbThickness: 3,
  hasProgressBar: true,
  text: '',
  textColor: '#FFFFFF',
  textPosition: 'center-center',
  maxTime: -1,
  minTime: 300
};

@NgModule({
  declarations: [
    AppComponent
  ],
  imports: [
    BrowserModule,
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    HttpClientModule,
    BrowserAnimationsModule,
    ToastrModule.forRoot(),
    NgxUiLoaderModule.forRoot(ngxUiLoaderConfig),
    SharedModule,
    AppRoutingModule
  ],
  providers: [
    provideClientHydration(),
    provideAnimations(),
    provideToastr({
      timeOut: 3000,
      positionClass: 'toast-top-right',
      preventDuplicates: true,
    }),
    DatePipe,
    Constants,
    // Add the error handler provider
    {
      provide: ErrorHandler,
      useClass: GlobalErrorHandler
    }
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
