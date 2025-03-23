import { Component } from '@angular/core';
import { DelegateService } from '../../services/delegate.service';
import { ActivatedRoute, Router } from '@angular/router';
import { EncryptionService } from '../../../../shared/services/encryption.service';
import { SharedService } from '../../../../shared/services/shared.service';
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

  constructor(
    private delegateService: DelegateService,
    private route: ActivatedRoute,
    private encryptionService: EncryptionService,
    private sharedService : SharedService,
    private router : Router,
    private ngxLoader : NgxUiLoaderService
  ) {}

  async ngOnInit() {
    this.route.queryParams.subscribe(async (params: any) => {
      if (params != undefined && Object.keys(params).length > 0) {
        if (params['data']) {
          let data = params['data'].replace(/ /g, '+');
          let decryptedData = this.encryptionService.decrypt(data);
          console.log('Decrypted Data:', decryptedData);

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
        }
      }
      if (this.email != '' && this.pay_type != '' && this.reference_no != '') {
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

    this.ngxLoader.start();
    this.loading = true;
    await this.delegateService.postDelegateOnlineMP(obj).subscribe({
      next: (response: any) => {
        //window.location.href = response.paymentUrl
        // Redirect to the IPG gateway
        this.loading = false;
        this.ngxLoader.stop();
        if(response.success) {
          // this.sharedService.ToastPopup(response.message,'','success');
          this.paymentData = response.data[0];
          this.message = response.message;
        }
        const form = document.createElement('form');
        form.method = 'POST';
        form.action = response.gatewayUrl;

        Object.keys(response.formData).forEach((key) => {
          if (response.formData[key] !== null && response.formData[key] !== undefined) {
            const input = document.createElement('input');
            input.type = 'hidden';
            input.name = key;
            input.value = response.formData[key];
            form.appendChild(input);
          }
        });

        document.body.appendChild(form);
        form.submit();
      },
      error: (error: any) => {
        this.loading = false;
        this.ngxLoader.stop();
        console.log('Error creating delegate:', error);
      },
    });
  }
}
