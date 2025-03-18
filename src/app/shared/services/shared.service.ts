import { Injectable } from '@angular/core';
import { ApiEndpointsService } from '../../../app/core/services/api-endpoints.service';
import { ApiHttpService } from '../../../app/core/services/api-http.service';
import { Subject } from 'rxjs';
import { filter } from 'rxjs/operators';
import { environment } from '../../../environments/environment';
import { ToastrService } from 'ngx-toastr';
import { Meta, Title } from '@angular/platform-browser';
import { ActivatedRoute, NavigationEnd, Router } from '@angular/router';
import { META_CONFIG } from '../classes/meta.config';
import { HttpClient } from '@angular/common/http';
@Injectable({
  providedIn: 'root'
})
export class SharedService {
  apiUrl: any = environment.apiUrl;
  headerIcon: any = '';
  permissionData: any;

  private refreshPermissionSubject = new Subject<boolean>();
  refresh$ = this.refreshPermissionSubject.asObservable();
  isMobileView = new Subject();


  constructor(
    private _apiHttpService: ApiHttpService,
    private _apiEndpointsService: ApiEndpointsService,
    private _toastr: ToastrService,
    private meta: Meta,
    private titleService: Title,
    private router: Router,
    private activatedRoute: ActivatedRoute,
    private http: HttpClient
  ) {
    this.router.events
      .pipe(filter(event => event instanceof NavigationEnd))
      .subscribe(() => this.updateMetaTags());
  }

  updateMetaTags() {
    const routeData = this.getRouteData();

    if (routeData && routeData.metaKey) {
        const metaInfo = META_CONFIG[routeData.metaKey];

        if (metaInfo) {
            // Set the meta tags dynamically using Meta service
            this.titleService.setTitle(metaInfo.title);
            this.meta.updateTag({ name: 'title', content: metaInfo.title });
            this.meta.updateTag({ name: 'description', content: metaInfo.description });
            this.meta.updateTag({ property: 'og:title', content: metaInfo.title });
            this.meta.updateTag({ property: 'og:description', content: metaInfo.description });
            this.meta.updateTag({ property: 'og:url', content: metaInfo.link });

            // Add or update the canonical link
            const link: HTMLLinkElement = document.querySelector('link[rel="canonical"]') || document.createElement('link');
            link.setAttribute('rel', 'canonical');
            link.setAttribute('href', metaInfo.link);

            if (!document.head.contains(link)) {
                document.head.appendChild(link);
            }
        }
    }
}


private getRouteData(): any {
  let route = this.activatedRoute;
  while (route.firstChild) {
    route = route.firstChild;
  }
  return route.snapshot.data;
}

  ToastPopup(errorMsg: string, errorModule: string, errorType: string) {
    switch (errorType) {
      case 'error':
        this._toastr.error(errorMsg, errorModule, {
          progressBar: true,
        });

        break;

      case 'info':
        this._toastr.info(errorMsg, errorModule, {
          progressBar: true,
        });

        break;

      case 'success':
        this._toastr.success(errorMsg, errorModule, {
          progressBar: true,
        });

        break;
    }
  }


  registration(data: any) {
    return this._apiHttpService.post(this._apiEndpointsService.registrationEndpoint(), data
    )
  }

  contectUs(data: any) {
    return this._apiHttpService.post(this._apiEndpointsService.contectUsEndpoint(), data
    )
  }

  postPeacekeeper(data: any) {
    return this._apiHttpService.post(this._apiEndpointsService.peacekeeperEndpoint(), data
    )
  }

  capchaa() {
    return this._apiHttpService.get(this._apiEndpointsService.captchaEndpoint()
    )
  }


  registratiotjoin(data: any) {
    return this._apiHttpService.post(this._apiEndpointsService.registratiotjoinEndpoint(), data
    )
  }
  addbrochure(data: any) {
    return this._apiHttpService.post(this._apiEndpointsService.addbrochureEndpoint(), data
    )
  }

  brochure(data: any) {
    return this._apiHttpService.post(this._apiEndpointsService.sales_brochureEndpoint(), data
    )
  }

  getIPAddress() {
    return this._apiHttpService.get('https://api64.ipify.org?format=json')
  }

  registrationOnline(data: any) {
    return this._apiHttpService.post(this._apiEndpointsService.postRegistrationOnlineEndpoint(), data
    )
  }

}
