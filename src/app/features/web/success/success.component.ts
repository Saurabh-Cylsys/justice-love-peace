
import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { DelegateService } from '../../delegate/services/delegate.service';

@Component({
  selector: 'app-success',
  templateUrl: './success.component.html',
  styleUrls: ['./success.component.css']})
export class SuccessComponent implements OnInit {
  transactionId: string | null = null;
  isPaymentSuccessful: boolean = false;
  isPaymentStatus:  string = 'success';
  isPaymentError: boolean = false;
  errorMessage: string = '';
  sessionId: string | null = null;
  transactionVerified: boolean | undefined;

  constructor(private route: ActivatedRoute,
    private router : Router,
    private DelegateService: DelegateService,
     private http: HttpClient) {
    this.route.queryParams.subscribe((params) => {
      this.sessionId = params['session_id'] || 'No session_id';
    });
  }

  ngOnInit() {

    this.verifySession();

  }
verifySession(){
  console.log( this.transactionVerified , 'transactionVerified.....22');

let body={
  // sessionId: "cs_test_a1wx1VFhgcGnSFpvXZ36uXOna2QbD3gYfXdi1ZefYj9MYOwUv6bpj1v2Ak"
  sessionId: this.sessionId

}
  this.DelegateService.postVerifySession(body).subscribe({
    next: (response:any) => {
              if (response.success) {
                console.log('Session Verified:', response.session);
                this.isPaymentStatus = response.session.status;
                this.transactionVerified = true;
                console.log( this.isPaymentStatus , 'transactionVerified.....22');

              } else {
                // this.isPaymentStatus = response.session.status;
                this.isPaymentStatus = 'failed';
                console.error('Payment not completed:', response.message);
              }
            },
            error: (err) => console.error('Error verifying session:', err),
  });
}

  // if (this.sessionId) {
  //   // Call the backend to verify the session
  //   this.http
  //     .post<any>('http://localhost:3000/verify-session', { session_id: this.sessionId })
  //     .subscribe({
  //       next: (response) => {
  //         if (response.success) {
  //           console.log('Session Verified:', response.session);
  //           this.transactionVerified = true;
  //         } else {
  //           console.error('Payment not completed:', response.message);
  //         }
  //       },
  //       error: (err) => console.error('Error verifying session:', err),
  //     });
  // }

  redirectToHome(){
    this.router.navigate(['/home']);
  }
}
