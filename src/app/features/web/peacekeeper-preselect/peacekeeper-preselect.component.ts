import { Component, HostListener } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { DelegateService } from '../../delegate/services/delegate.service';
import { NgxUiLoaderService } from 'ngx-ui-loader';
import { SharedService } from '../../../shared/services/shared.service';
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
  onlineDiscount: any;
  childNominationDiscount: any;
  peacekeeperDiscount: any;
  offlineDiscount: any;
  isStrip: string = "";
  delegateOfflineDescription : string = "";
  peaceStudentDescription : string = "";
  delegateOnlineDescription : string = "";
  peacekeeperDescription : string = "";
  isMobileView = false;
  isOnline: number=0;

  constructor(private router: Router,
              private route: ActivatedRoute,
              private ngxLoader : NgxUiLoaderService,
              private sharedService : SharedService,
              private encryptionService : EncryptionService) { }

  ngOnInit() {
    this.checkWindowSize();
    this.ngxLoader.start();
    setTimeout(() => {
      this.ngxLoader.stop();
    }, 2000);

    this.route.queryParams.subscribe(async (params: any) => {
      if (params != undefined && Object.keys(params).length > 0) {
        this.referralCode = params.code || null; ;
        if (params.medium == 1 && params.code) {

          if (this.referralCode) {
            await this.fnValidateCoupon(this.referralCode);

          }
          this.router.navigate(['/delegate-registration'], {
            queryParams: this.referralCode ? { code: this.referralCode } : {}, // Pass query params
            queryParamsHandling: 'merge', // Preserve existing query params (optional)
            relativeTo: this.route, // Stay on the same route
          })
        }

        else if (!params.medium) {
          // console.log('Medium value not found, redirecting...');
          if (this.referralCode) {
            await this.fnValidateCoupon(this.referralCode);
          }
          this.router.navigate(['/peacekeeper-preselect'], {
            queryParams: this.referralCode ? { code: this.referralCode } : {},
          });
        }
      
      else if (params.medium == -1) {
        // console.log('Medium value not found, redirecting...');
        if (this.referralCode) {
          await this.fnValidateCoupon(this.referralCode);
        }
        this.router.navigate(['/world-peacekeepers-movement'], {
          queryParams: this.referralCode ? { code: this.referralCode } : {},
        });
      }
    
      else {
        await this.fnValidateCoupon(0);
      }
    }
    });
  }

  async fnValidateCoupon(referalCode: string | any) {

    this.ngxLoader.start();
    await this.sharedService.getDiscountAmountByCouponCode(referalCode).subscribe({
      next: (response: any) => {
        let decryptData = this.encryptionService.decrypt(response.encryptedData);
        let resDecrypt = JSON.parse(decryptData);

        if(resDecrypt && resDecrypt.success) {

          this.isStrip = resDecrypt.isStripe;

          if(this.isStrip == "false") {

            // This is for Magneti

            this.ngxLoader.stop();
            resDecrypt.data.forEach((item:any) => {
              if (item.p_type === "DELEGATE_ONLINE") {
                this.isOnline = item.is_online;
                this.onlineDiscount = item.dollar_aed;
                this.delegateOnlineDescription = item.amount_description;
              } else if (item.p_type === "DELEGATE_CHILD_NOMINATION") {
                this.childNominationDiscount = item.dollar_aed;
                this.peaceStudentDescription = item.amount_description;
              } else if (item.p_type === "DELEGATE_OFFLINE") {
                this.offlineDiscount = item.dollar_aed;
                this.delegateOfflineDescription = item.amount_description;
              } else if (item.p_type === "PEACEKEEPER") {
                this.peacekeeperDiscount = item.dollar_aed;
                this.peacekeeperDescription = item.amount_description;
              }
            });
          }
          else if(this.isStrip == "true") {

            // this is for stripe

            this.ngxLoader.stop();

            resDecrypt.data.forEach((item:any) => {
              if (item.p_type === "DELEGATE_ONLINE") {
                this.isOnline = item.is_online;
                this.onlineDiscount = item.discount_amount;
                this.delegateOnlineDescription = item.amount_description;
              } else if (item.p_type === "DELEGATE_CHILD_NOMINATION") {
                this.childNominationDiscount = item.discount_amount;
                this.peaceStudentDescription = item.amount_description;
              } else if (item.p_type === "DELEGATE_OFFLINE") {
                this.offlineDiscount = item.discount_amount;
                this.delegateOfflineDescription = item.amount_description;
              } else if (item.p_type === "PEACEKEEPER") {
                this.peacekeeperDiscount = item.discount_amount;
                this.peacekeeperDescription = item.amount_description;
              }
            });
          }
        }
      },
      error: (error: any) => {
        this.ngxLoader.stop();
        let decryptErr:any = this.encryptionService.decrypt(error.error.encryptedData);
        decryptErr = JSON.parse(decryptErr);
        console.error('Error :', decryptErr);
        this.sharedService.ToastPopup(decryptErr['error'],'','error');
      }
    });
  }

  // async fnValidateCoupon(referalCode: any) {

  //   let obj = {
  //     "coupon_code": referalCode
  //   }

  //   await this.delegateService.getCouponValidation(obj).subscribe({
  //     next: (response: any) => {
  //       if (response.success == true && response.valid == 1) {
  //         this.packageAmt = 2604;
  //         this.onlinepackageAmt = 260;
  //       }
  //       else {
  //         this.packageAmt = 2800;
  //         this.onlinepackageAmt = 280;
  //         this.referralCode = '';
  //       }
  //     },
  //     error: (error: any) => {
  //       this.packageAmt = 2800;
  //       this.onlinepackageAmt = 280;
  //       this.referralCode = '';
  //     }
  //   });
  // }



  // goToDelegatePage() {

  //   if (this.referralCode) {
  //     this.router.navigate(['/delegate-online'], {
  //       queryParams: { dType: 'offline', code: this.referralCode, medium: 0 }
  //     });
  //   }
  //   else {
  //     this.router.navigate(['/delegate-online'], {
  //       queryParams: { dType: 'offline' }
  //     });
  //   }
  // }

  goToDelegatePage() {
    let dType = 'offline'
    const encryptedParams = this.encryptionService.encrypt(dType);
    if (this.referralCode) {
      this.router.navigate(['/delegate-online'], {
        queryParams: { dType: encryptedParams, code: this.referralCode, medium: 0 }
      });
    }
    else {
      this.router.navigate(['/delegate-online'], {
        queryParams: { dType: encryptedParams }
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
      queryParams: { code: this.referralCode }
    });
  }


  goToPeacekeeper() {
    let params = {
     dType: 'offline',
     code: this.referralCode
     };
     const encryptedParams = this.encryptionService.encryptData(params);
 
     this.router.navigate(['/world-peacekeepers-movement'], {
       queryParams: { code: this.referralCode }
     });
   }
  // goToOnlineDelegate() {
  //   if (this.referralCode) {
  //     this.router.navigate(['/delegate-online'], {
  //       queryParams: { dType: 'online', code: this.referralCode }
  //     });
  //   }
  //   else {
  //     this.router.navigate(['/delegate-online'], {
  //       queryParams: { dType: 'online' }
  //     });
  //   }
  // }

  goToOnlineDelegate() {

    let dType = 'online'
    const encryptedParams = this.encryptionService.encrypt(dType);
    if (this.referralCode) {
      this.router.navigate(['/delegate-online'], {
        queryParams: { dType: encryptedParams, code: this.referralCode }
      });
    }
    else {
      this.router.navigate(['/delegate-online'], {
        queryParams: { dType: encryptedParams }
      });
    }
  }
  checkWindowSize(): void {
    if (window.innerWidth <= 900) {
      this.sharedService.isMobileView.next(true);
      this.isMobileView = true;
    } else {
      this.sharedService.isMobileView.next(false);
      this.isMobileView = false;
    }
  }

  // Listen to window resize events
  @HostListener('window:resize', ['$event'])
  onResize(event: any): void {
    this.checkWindowSize();
  }
}