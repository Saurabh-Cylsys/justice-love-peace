import { SharedService } from './../../../../shared/services/shared.service';
import { Component } from '@angular/core';
import { DelegateService } from '../../services/delegate.service';
import { ActivatedRoute, Router } from '@angular/router';
import { EncryptionService } from '../../../../shared/services/encryption.service';
import { NgxUiLoaderService } from 'ngx-ui-loader';
import { debug } from 'console';

@Component({
  selector: 'app-delegate-email-payment',
  templateUrl: './delegate-email-payment.component.html',
  styleUrl: './delegate-email-payment.component.css',
})
export class DelegateEmailPaymentComponent {
  email: string = '';
  pay_type: string = '';
  reference_no: string = '';
  loading: boolean = false;
  paymentData: any;
  message: string = "";
  token : string ="";

  constructor(
    private delegateService: DelegateService,
    private route: ActivatedRoute,
    private encryptionService: EncryptionService,
    private ngxLoader : NgxUiLoaderService,
    private sharedService : SharedService
  ) {}

  async ngOnInit() {

    this.ngxLoader.start();
    setTimeout(() => {
      this.ngxLoader.stop();
    }, 1500);

    this.route.queryParams.subscribe(async (params: any) => {
      if (params != undefined && Object.keys(params).length > 0) {
        if (params['data']) {
          let data = params['data'].replace(/ /g, '+');
          let decryptedData = this.encryptionService.decrypt(data);
console.log(decryptedData);

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
          this.token = parsedData.token;
          this.sharedService.setJWTToken(this.token);
        }
      }
      if (this.email != '' && this.pay_type != '' && this.reference_no != '' && this.token) {
        await this.fnMagnatiPG();
      }
    });
  }

  async fnMagnatiPG() {
    let obj = {
      email: this.email,
      pay_type: this.pay_type,
      reference_no: this.reference_no,
    };
    const EncryptData = this.encryptionService.encrypt(obj);
    let reqBody = {
      encryptedData: EncryptData
    }
    this.ngxLoader.start();
    this.loading = true;
    await this.delegateService.postDelegateOnlineMP(reqBody).subscribe({
      next: (response: any) => {
        let decryptData:any = this.encryptionService.decrypt(response.encryptedData);
        decryptData = JSON.parse(decryptData);
        //window.location.href = response.paymentUrl
        // Redirect to the IPG gateway
        this.loading = false;
        this.ngxLoader.stop();
        if(decryptData.success) {
          // this.sharedService.ToastPopup(response.message,'','success');
          this.paymentData = decryptData.data[0];
          this.message = decryptData.message;
        }
        const form = document.createElement('form');
        form.method = 'POST';
        form.action = decryptData.gatewayUrl;

        Object.keys(decryptData.formData).forEach((key) => {
          if (decryptData.formData[key] !== null && decryptData.formData[key] !== undefined) {
            const input = document.createElement('input');
            input.type = 'hidden';
            input.name = key;
            input.value = decryptData.formData[key];
            form.appendChild(input);
          }
        });

        document.body.appendChild(form);
        form.submit();
      },
      error: (error: any) => {
        let decryptErr:any = this.encryptionService.decrypt(error.error.encryptedData);
        decryptErr = JSON.parse(decryptErr);
        this.sharedService.ToastPopup(decryptErr['message'],'','error');
        this.loading = false;
        this.ngxLoader.stop();
      },
    });
  }
}
