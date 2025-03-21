import { Component } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { DelegateService } from '../../delegate/services/delegate.service';
import { EncryptionService } from '../../../shared/services/encryption.service';
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

  constructor(
    private router: Router,
     private route: ActivatedRoute,
      private delegateService: DelegateService,
      private encryptionService: EncryptionService
    ) { }

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
    let params;
    if (this.referralCode) {
      params = {
        dType: 'offline',
        code: this.referralCode,
        medium: 0
      };

    } else {
      params = {
        dType: 'offline'
      };
    }

    const encryptedParams = this.encryptionService.encryptData(params);
    if (this.referralCode) {
      this.router.navigate(['/delegate-online'], {
        queryParams: { data : encryptedParams }
      });
    }
    else {
      this.router.navigate(['/delegate-online'], {
        queryParams: { data : encryptedParams  }
      });
    }
  }

  goToChildNomination() {
   let params = {
    dType: 'offline', 
    code: this.referralCode
    };
    const encryptedParams = this.encryptionService.encryptData(params);

    this.router.navigate(['/delegate-student'], {
      queryParams: { data : encryptedParams }
    });
  }

  goToOnlineDelegate() {

    let params;
    if (this.referralCode) {
      params = {
        dType: 'online',
        code: this.referralCode
      };

    } else {
      params = {
        dType: 'online'
      };
    }

    const encryptedParams = this.encryptionService.encryptData(params);

    if (this.referralCode) {
      this.router.navigate(['/delegate-online'], {
        queryParams: { data : encryptedParams }
      });
    }
    else {
      this.router.navigate(['/delegate-online'], {
        queryParams: { data : encryptedParams }
      });
    }
  }
}