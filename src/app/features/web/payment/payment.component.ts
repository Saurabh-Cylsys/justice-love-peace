
import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { SharedService } from '../../../../app/shared/services/shared.service';
import { DelegateService } from '../../delegate/services/delegate.service';

@Component({
  selector: 'app-payment',
  template: '<p>Redirecting to payment...</p>',
})
export class PaymentComponent implements OnInit {
  isPaymentSuccessful: boolean = false;
  isPaymentStatus:  string = 'success';
  isPaymentError: boolean = false;
  errorMessage: string = '';

    email:string = '';
 
  constructor(private router: Router,
    private http :HttpClient,
    private route :ActivatedRoute,
    private SharedService: SharedService,
    private DelegateService: DelegateService,


  ) {
    this.route.queryParams.subscribe((params) => {
      this.email = params['email'] || 'No email';
    });
  }
 
  ngOnInit() {
this.checkoutSession();
console.log('email',this.email);

  }
checkoutSession(){
let body={
  email: this.email
}
  this.DelegateService.postCheckoutSession(body).subscribe({
    next: (response:any) => {
      if (response.url) {
        window.location.href = response.url; // Redirect to Stripe Checkout
      }
    },
    error: (err) => console.error('Error creating checkout session:', err),
  });
}




    // // Redirect to Stripe Payment URL
    // // window.location.href = this.stripePaymentUrl;
    // this.http
    //   .post<any>('http://localhost:3000/create-checkout-session', { email: this.email })
    //   .subscribe({
    //     next: (response) => {
    //       if (response.url) {
    //         window.location.href = response.url; // Redirect to Stripe Checkout
    //       }
    //     },
    //     error: (err) => console.error('Error creating checkout session:', err),
    //   });
}