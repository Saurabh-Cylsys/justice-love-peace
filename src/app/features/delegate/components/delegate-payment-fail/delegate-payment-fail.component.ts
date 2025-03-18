import { Component, OnInit } from '@angular/core';
import { DomSanitizer } from '@angular/platform-browser';
import { ActivatedRoute, Router } from '@angular/router';
import { DelegateService } from '../../services/delegate.service';


@Component({
  selector: 'app-delegate-payment-fail',
  templateUrl: './delegate-payment-fail.component.html',
  styleUrls: ['./delegate-payment-fail.component.css']
})
export class DelegatePaymentFailComponent {
  formData: any;
  errorMessage = '';
  transactionId = '';
  errorCode = '';

  constructor(
    private route: ActivatedRoute,
    private paymentService: DelegateService,
    private sanitizer: DomSanitizer,
    private router:Router
  ) {}

  ngOnInit() {
    this.route.queryParams.subscribe(params => {
      this.errorCode = params['code'];
      this.transactionId = params['txnId'];

      // Get stored payment data
      const pendingData = sessionStorage.getItem('pendingPayment');
      if (pendingData) {
        this.formData = JSON.parse(pendingData).data;
      }
    });

    // Clear sensitive data after 5 minutes
    setTimeout(() => {
      sessionStorage.removeItem('pendingPayment');
    }, 300000);
  }

  async retryPayment() {
    if (this.formData) {
      let obj = {
        "amount": 100.00,
        "currency": "AED"
      }
      await this.paymentService.postDelegateOnlineMP(obj).subscribe({
        next: (response: any) => {
          //window.location.href = response.paymentUrl

          // Redirect to the IPG gateway
          const form = document.createElement('form');
          form.method = 'POST';
          form.action = response.paymentUrl;

          Object.keys(response.paymentData).forEach((key) => {
            const input = document.createElement('input');
            input.type = 'hidden';
            input.name = key;
            input.value = response.paymentData[key];
            form.appendChild(input);
          });

          document.body.appendChild(form);
          form.submit();

        },
        error: (error: any) => {
          console.error('Error creating delegate:', error);
          //this.loading = false;
        }
      });
    }
  }

  cancelPayment() {
    sessionStorage.removeItem('pendingPayment');
    this.router.navigate(['/']);
  }

  sanitizeMessage(msg: string) {
    return this.sanitizer.bypassSecurityTrustHtml(msg);
  }
}
