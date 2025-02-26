import { Component } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-peacekeeper-preselect',
  templateUrl: './peacekeeper-preselect.component.html',
  styleUrls: ['./peacekeeper-preselect.component.css'],
})
export class PeacekeeperPreselectComponent {
  referralCode: string = '';
  mediumValue: string | null = '';

  constructor(private router: Router, private route: ActivatedRoute) {}

  ngOnInit() {
    this.route.queryParams.subscribe((params: any) => {
      // if (params) {
      //   this.referralCode = params.code;
      // }
      // if (this.referralCode) {
      //   console.log(this.referralCode, 'referralCode..........');
      // }

      console.log("Params",params);
      // {code: "COININ-0000001-W"
      //   medium: "1"
      // }
      if(params != undefined && Object.keys(params).length > 0){

      this.referralCode = params.code;
      if(params.medium == 1 && params.code) {

        this.router.navigate(['/delegate-registration'], {
          queryParams: { code: this.referralCode }, // Pass query params
          queryParamsHandling: 'merge', // Preserve existing query params (optional)
          relativeTo: this.route, // Stay on the same route
        })
      }

      else if(!params.medium) {
        console.log('Medium value not found, redirecting...');
          this.router.navigate(['/peacekeeper-preselect'], {
            queryParams: { code: this.referralCode },
          });
      }
    }

    });
  }

  goToDelegatePage() {

    this.router.navigate(['/delegate-registration'], {
      queryParams: { code: this.referralCode ,medium :0 }
    });
  }

  goToChildNomination() {

    this.router.navigate(['/delegate-child-nomination'], {
      queryParams: { code: this.referralCode }
    });
  }
}
