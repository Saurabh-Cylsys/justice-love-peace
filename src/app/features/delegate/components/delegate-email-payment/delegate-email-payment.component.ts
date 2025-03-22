import { Component } from '@angular/core';
import { DelegateService } from '../../services/delegate.service';
import { ActivatedRoute } from '@angular/router';
import { EncryptionService } from '../../../../shared/services/encryption.service';

@Component({
  selector: 'app-delegate-email-payment',
  templateUrl: './delegate-email-payment.component.html',
  styleUrl: './delegate-email-payment.component.css',
})
export class DelegateEmailPaymentComponent {
  email: string = '';
  pay_type: string = '';
  reference_no: string = '';

  constructor(
    private delegateService: DelegateService,
    private route: ActivatedRoute,
    private encryptionService: EncryptionService
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

    await this.delegateService.postDelegateOnlineMP(obj).subscribe({
      next: (response: any) => {
        //window.location.href = response.paymentUrl
        // Redirect to the IPG gateway
        const form = document.createElement('form');
        form.method = 'POST';
        form.action = response.gatewayUrl;

        Object.keys(response.formData).forEach((key) => {
          const input = document.createElement('input');
          input.type = 'hidden';
          input.name = key;
          input.value = response.formData[key];
          form.appendChild(input);
        });

        document.body.appendChild(form);
        form.submit();
      },
      error: (error: any) => {
        console.error('Error creating delegate:', error);
      },
    });
  }
}
