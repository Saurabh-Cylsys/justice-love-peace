import { Component } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { DelegateService } from '../../delegate/services/delegate.service';
@Component({
  selector: 'app-peacekeeper-preselect',
  templateUrl: './peacekeeper-preselect.component.html',
  styleUrls: ['./peacekeeper-preselect.component.css'],
})
export class PeacekeeperPreselectComponent {
  referralCode: string = '';
  mediumValue: string | null = '';
  packageAmt: number = 2800;
  onlinepackageAmt: number = 280;

  constructor(private router: Router, private route: ActivatedRoute, private delegateService: DelegateService) { }

  ngOnInit() {
    this.route.queryParams.subscribe(async (params: any) => {

      if (params != undefined && Object.keys(params).length > 0) {
        this.referralCode = params.code;
        if (params.medium == 1 && params.code) {
          if (this.referralCode) {
            await this.fnValidateCoupon(this.referralCode);

          }
          this.router.navigate(['/delegate-registration'], {
            queryParams: { code: this.referralCode }, // Pass query params
            queryParamsHandling: 'merge', // Preserve existing query params (optional)
            relativeTo: this.route, // Stay on the same route
          })
        }

        else if (!params.medium) {
          console.log('Medium value not found, redirecting...');
          if (this.referralCode) {
            await this.fnValidateCoupon(this.referralCode);
          }
          this.router.navigate(['/peacekeeper-preselect'], {
            queryParams: { code: this.referralCode },
          });
        }
      }

    });
  }

  async fnValidateCoupon(referalCode: any) {

    let obj = {
      "coupon_code": referalCode
    }
debugger;
    await this.delegateService.getCouponValidation(obj).subscribe({
      next: (response: any) => {
        if (response.success == true && response.valid == 1) {
          this.packageAmt = 2604;
          this.onlinepackageAmt = 260;
        }
        else {
          this.packageAmt = 2800;
          this.onlinepackageAmt = 280;
          this.referralCode = '';
        }
      },
      error: (error: any) => {
        this.packageAmt = 2800;
        this.onlinepackageAmt = 280;
        this.referralCode = '';
      }
    });
  }

  goToDelegatePage() {

    if (this.referralCode) {
      this.router.navigate(['/delegate-online'], {
        queryParams: { dType: 'offline', code: this.referralCode, medium: 0 }
      });
    }
    else {
      this.router.navigate(['/delegate-online'], {
        queryParams: { dType: 'offline' }
      });
    }
  }

  goToChildNomination() {

    this.router.navigate(['/delegate-student'], {
      queryParams: { dType: 'offline', code: this.referralCode }
    });
  }

  goToOnlineDelegate() {
    if (this.referralCode) {
      this.router.navigate(['/delegate-online'], {
        queryParams: { dType: 'online', code: this.referralCode }
      });
    }
    else {
      this.router.navigate(['/delegate-online'], {
        queryParams: { dType: 'online' }
      });
    }
  }
}