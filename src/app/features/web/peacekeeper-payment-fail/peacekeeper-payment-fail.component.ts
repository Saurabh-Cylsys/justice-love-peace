import { Component } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { DelegateService } from '../../delegate/services/delegate.service';
import { DomSanitizer } from '@angular/platform-browser';
import { EncryptionService } from '../../../shared/services/encryption.service';
import { NgxUiLoaderService } from 'ngx-ui-loader';
import { SharedService } from '../../../shared/services/shared.service';

@Component({
  selector: 'app-peacekeeper-payment-fail',
  templateUrl: './peacekeeper-payment-fail.component.html',
  styleUrl: './peacekeeper-payment-fail.component.css'
})
export class PeacekeeperPaymentFailComponent {
 formData: any;
  errorMessage = '';
  transactionId = '';
  code = '';

  email: string = '';
  pay_type: string = '';
  reference_no: string = '';
  p_type: any;
  token: any;

  constructor(
    private route: ActivatedRoute,
    private paymentService: DelegateService,
    private sanitizer: DomSanitizer,
    private router:Router,
    private encryptionService : EncryptionService,
    private ngxLoader : NgxUiLoaderService,
    private sharedService : SharedService
  ) {}

  ngOnInit() {

    this.route.queryParams.subscribe(params => {

      if (params != undefined && Object.keys(params).length > 0) {

      if (params['data']) {
        let data = params['data'].replace(/ /g, '+');
        let decryptedData = this.encryptionService.decryptParameter(data);

        // Parse key-value pairs from decryptedData
        const paramPairs = decryptedData.split('&');
        const parsedData: any = {};

        paramPairs.forEach((pair) => {
          const [key, value] = pair.split('=');
          if (key && value) {
            parsedData[key.trim()] = decodeURIComponent(value.trim());
          }
        });

        // Assign values to class properties
        this.email = parsedData.email;
        this.pay_type = parsedData.p_type;
        this.reference_no = parsedData.reference_no;
        this.code = parsedData.code;
        this.token = parsedData.token;
        this.sharedService.setJWTToken(this.token);
      }

      // Get stored payment data
      const pendingData = sessionStorage.getItem('pendingPayment');
      if (pendingData) {
        this.formData = JSON.parse(pendingData).data;
      }
    }
    });

    // Clear sensitive data after 5 minutes
    setTimeout(() => {
      sessionStorage.removeItem('pendingPayment');
    }, 300000);
  }

  retryPayment() {

      let obj = {
        "email": this.email,
        "pay_type": this.pay_type,
        "reference_no": this.reference_no,
      };
      const EncryptData = this.encryptionService.encrypt(obj);
      let reqBody = {
        encryptedData: EncryptData
      }

      this.ngxLoader.start();
     this.paymentService.postDelegateOnlineMP(reqBody).subscribe({
        next: (response: any) => {
          let decryptData:any = this.encryptionService.decrypt(response.encryptedData);
          decryptData = JSON.parse(decryptData);
          //window.location.href = response.paymentUrl
          this.ngxLoader.stop();
          // Redirect to the IPG gateway
          const form = document.createElement('form');
          form.method = 'POST';
          form.action = decryptData.gatewayUrl;

          Object.keys(decryptData.formData).forEach((key) => {
            const input = document.createElement('input');
            input.type = 'hidden';
            input.name = key;
            input.value = decryptData.formData[key];
            form.appendChild(input);
          });

          document.body.appendChild(form);
          form.submit();

        },
        error: (error: any) => {
          let decryptErr:any = this.encryptionService.decrypt(error.error.encryptedData);
          decryptErr = JSON.parse(decryptErr);
          this.ngxLoader.stop();
          this.sharedService.ToastPopup(decryptErr['message'],'','error');
          //this.loading = false;
        }
      });
  }

  cancelPayment() {
    sessionStorage.removeItem('pendingPayment');
    this.router.navigate(['/']);
  }

  sanitizeMessage(msg: string) {
    return this.sanitizer.bypassSecurityTrustHtml(msg);
  }
}
