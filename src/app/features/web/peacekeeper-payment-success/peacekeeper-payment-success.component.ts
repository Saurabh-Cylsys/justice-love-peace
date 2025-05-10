import { Component } from '@angular/core';
import { DelegateService } from '../../delegate/services/delegate.service';
import { SharedService } from '../../../shared/services/shared.service';
import { ActivatedRoute, Router } from '@angular/router';
import { LocationStrategy } from '@angular/common';
import { EncryptionService } from '../../../shared/services/encryption.service';
import { FormGroup } from '@angular/forms';
import { SafeResourceUrl } from '@angular/platform-browser';
import { environment } from '../../../../environments/environment';
import { WebService } from '../webz-services/web.service';
interface registrationPeaceBookData {
  full_name: string;
  email: string;
  transcation_id: string;
  transcation_json: any;
  badge_id: string;
  country: string;
  referralCode?: string
}
@Component({
  selector: 'app-peacekeeper-payment-success',
  templateUrl: './peacekeeper-payment-success.component.html',
  styleUrl: './peacekeeper-payment-success.component.css'
})
export class PeacekeeperPaymentSuccessComponent {
    completeProfileForm!: FormGroup;
    showPaymentSuccess = false;
    showCompleteProfileForm = false;
    paymentSuccess = false;
    paymentLink: SafeResourceUrl | null = null;
    loading:boolean = false;
    sessionId: any;
    isPaymentStatus: any;
    transactionVerified: boolean = false;
    countryData: any = [];
    showCountryDropdown = false;
    filteredCountries: any[] = [];
    selectedCountryName = '';
    referralCode: any;
    formattedDate: string = '';
    minDate: string | null = null;
    maxDate: string | null = null;
    colorTheme: string = 'theme-dark-blue';
    minDate1: any;
    maxDate1: any;
    isBackNavigation: boolean = false;
    transactionId: any;
    pType: any;
      peacebookwebAppurl : string = environment.peacebookWebAppUrl;
    
  registrationPeaceBookData: registrationPeaceBookData | null = null;
  btnDisabled : boolean = true;
  isPeaceBook: boolean = false;
  peacekeeperBadge: any;

    constructor(
  
      private delegateService: DelegateService,
      private sharedService: SharedService,
      private route: ActivatedRoute,
      private router: Router, 
      private webService: WebService,
      private locationStrategy: LocationStrategy,
      private encryptionService: EncryptionService,
    ) {
      // Prevent browser back navigation to payment URL
      // history.pushState(null, '', window.location.href);
  
  
      // Handle browser back button
      // window.addEventListener('popstate', () => {
      //   this.handleBackNavigation();
      // });
    }

    async ngOnInit() {

      this.route.queryParams.subscribe(async (params: any) => {
        if (params != undefined && Object.keys(params).length > 0) {
          this.sessionId = params['session_id'] || 'No session_id';
          this.pType = params['p_type'];
          if (this.sessionId != 'No session_id' && this.sessionId != '') {
              
              await this.verifyPeackeeperSession();
            
          }

        }
      });
    }

    async verifyPeackeeperSession() {
      this.loading = true;
      let body = {
        // sessionId: "cs_test_a1wx1VFhgcGnSFpvXZ36uXOna2QbD3gYfXdi1ZefYj9MYOwUv6bpj1v2Ak"
        sessionId: this.sessionId,
        p_type: this.pType
      }
      const EncryptData = this.encryptionService.encrypt(body);
      let reqBody = {
        encryptedData: EncryptData
      }
      await this.webService.postVerifyPeaceBookSession(reqBody).subscribe({
        next: (response: any) => {
          this.loading = false;
          let decryptData: any = this.encryptionService.decrypt(response.encryptedData);
          decryptData = JSON.parse(decryptData);

          this.loading = false;
          console.log('Response:', decryptData);
          if (decryptData.success) {
  
            this.isPaymentStatus = decryptData.session.payment_status;
            this.registrationPeaceBookData = {
              full_name: decryptData.Data.username,
              country: decryptData.Data.country,
              email: decryptData.Data.email,
              transcation_id: decryptData.session.payment_intent || '',
              transcation_json: { status: decryptData.session.status || '' },
              badge_id: decryptData.Data.idNo,
              referralCode: decryptData.QR_code
            };
  
            if (this.registrationPeaceBookData) {
              this.registrationPeaceBookData.email = decryptData.session.customer_email;
              this.registrationPeaceBookData.transcation_id = decryptData.session.payment_intent;
              this.registrationPeaceBookData.transcation_json.status = decryptData.session.status;
              this.registrationPeaceBookData = {
                full_name: decryptData.Data.username,
                country: decryptData.Data.country,
                email: decryptData.Data.email,
                transcation_id: decryptData.session.payment_intent || '',
                transcation_json: { status: decryptData.session.payment_status || '' },
                badge_id: decryptData.Data.idNo,
                referralCode: decryptData.QR_code
              };
            }
            this.peacekeeperBadge = decryptData.Data.batch;
            this.isPeaceBook = true;
            this.btnDisabled = false;
            this.transactionVerified = true;
            this.showPaymentSuccess = true;
          } else {
            this.isPaymentStatus = 'failed';
          }
        },
        error: (err) => {
          let decryptErr: any = this.encryptionService.decrypt(err.error.encryptedData);
          decryptErr = JSON.parse(decryptErr);
  
          this.loading = false;
          console.log('Error verifying session:', decryptErr['error']);
          this.sharedService.ToastPopup(decryptErr['error'], '', 'error');
        },
      });
    }
  
    downloadImage() {
      if (this.peacekeeperBadge) {
        fetch(this.peacekeeperBadge)
        .then(response => response.blob())  // Convert response to Blob
        .then(blob => {
          const url = URL.createObjectURL(blob); // Create an object URL for the blob
          const link = document.createElement('a');
          link.href = url;
          link.download = 'peacekeeper-card.png'; // Ensure it's saved as PNG
          document.body.appendChild(link);
          link.click();
          document.body.removeChild(link);
          URL.revokeObjectURL(url); // Clean up the object URL
        })
        .catch(error => console.error('Error downloading the image:', error));
      }
  
  
   
    }
}
