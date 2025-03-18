import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, NavigationEnd, Router } from '@angular/router';
import { DelegateService } from '../../services/delegate.service';
import { NgxUiLoaderService } from 'ngx-ui-loader';
import { filter, Subscription } from 'rxjs';

@Component({
  selector: 'app-delegate-message',
  templateUrl: './delegate-message.component.html',
  styleUrls: ['./delegate-message.component.css']
})
export class DelegateMessageComponent implements OnInit {
  emailId: string = '';
  userType: string = '';
  loading: boolean = true;
  hasAlreadyPaid: boolean = false;
  errorMessage: string = '';


  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private delegateService: DelegateService,
    private ngxService: NgxUiLoaderService
  ) {}

  ngOnInit(): void {
    this.route.queryParams.subscribe(params => {
      this.emailId = params['emailid'] || '';
      this.userType = params['type'] || '';

      // if (this.emailId && this.userType) {
      //   // this.checkPaymentStatus();
      // } else {
      //   this.loading = false;
      //   this.errorMessage = 'Missing required parameters';
      // }
    });

  }


  // checkPaymentStatus(): void {
  //   this.ngxService.start();
  //   this.loading = true;

  //   const payload = {
  //     email: this.emailId,
  //     type: this.userType
  //   };

  //   this.delegateService.postverifyPaymentStatus(payload).subscribe(
  //     (response: any) => {
  //       this.ngxService.stop();
  //       this.loading = false;

  //       if (response && response.status === 200) {
  //         this.hasAlreadyPaid = true;
  //       } else {
  //         this.hasAlreadyPaid = false;
  //       }
  //     },
  //     (error) => {
  //       this.ngxService.stop();
  //       this.loading = false;
  //       this.hasAlreadyPaid = false;
  //       this.errorMessage = error.error?.message || 'An error occurred while verifying payment status';
  //       console.error('Payment verification error:', error);
  //     }
  //   );
  // }

  // proceedToPayment(): void {
  //   this.router.navigate(['/delegate-online'], {
  //     queryParams: {
  //       email: this.emailId,
  //       type: this.userType
  //     }
  //   });
  // }


}

