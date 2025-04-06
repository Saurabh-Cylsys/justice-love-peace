import { Component } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { DelegateService } from '../../services/delegate.service';

@Component({
  selector: 'app-peacekeeper',
  templateUrl: './peacekeeper.component.html',
  styleUrl: './peacekeeper.component.css'
})
export class PeacekeeperComponent {

  name: string | null = null;

  constructor(private router: Router, private route: ActivatedRoute, private delegateService: DelegateService) { }

  ngOnInit(): void {
    debugger;
    this.route.paramMap.subscribe(async params => {
      this.name = params.get('name'); // Retrieve the 'name' parameter from the URL
      if (this.name) {
        // Navigate to the desired route with the 'name' parameter
        let body = {
          "coupon_code": this.name
        }
        await this.delegateService.getAmbassadorURL(body).subscribe((resp: any) => {
          /**{
          "url": "https://www.justice-love-peace.com/delegate-registration?code=COIND-0000072-A",
          "success": true,
          "error": false
      } */


          if (resp.success) {
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

        });
      }
    });
}
}
