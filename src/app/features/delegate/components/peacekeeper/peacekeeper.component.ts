import { Component } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { DelegateService } from '../../services/delegate.service';
import { SharedService } from '../../../../shared/services/shared.service';
import { NgxUiLoaderService } from 'ngx-ui-loader';

@Component({
  selector: 'app-peacekeeper',
  templateUrl: './peacekeeper.component.html',
  styleUrl: './peacekeeper.component.css'
})
export class PeacekeeperComponent {

  name: string | null = null;

  constructor(private router: Router,
              private route: ActivatedRoute,
              private delegateService: DelegateService,
              private sharedService: SharedService,
              private ngxService :NgxUiLoaderService) { }

  ngOnInit(): void {

    this.route.paramMap.subscribe(async params => {
      this.name = params.get('name'); // Retrieve the 'name' parameter from the URL

      if (this.name) {
        // Navigate to the desired route with the 'name' parameter
        let body = {
          "coupon_code": this.name.replace(/-/g, " "),
        }

        this.ngxService.start();
        await this.delegateService.getAmbassadorURL(body).subscribe((resp: any) => {
          /**{
          "url": "https://www.justice-love-peace.com/delegate-registration?code=COIND-0000072-A",
          "success": true,
          "error": false
      } */

          if (resp.success) {
            this.ngxService.stop();
            let url = resp.url;

            // Use URLSearchParams to parse the query string
            const queryString = url.split('?')[1];
            const params = new URLSearchParams(queryString);

            // Extract the 'code' parameter
            const code = params.get('code');

            // console.log(code); // Output: COIND-0000072-A
            // Navigate to the new URL with the 'code' parameter
            if (code) {
              this.router.navigate(['/peacekeeper-preselect'], { queryParams: { code: code } });
            }
          }

        },(err)=>{
          console.log(err);
          // Handle the error if needed
          this.sharedService.ToastPopup(err.message, '', 'error');
        });
      }
    });
}
}
