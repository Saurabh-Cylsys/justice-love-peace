import { Injectable } from '@angular/core';
import { UrlBuilder } from '../../../app/shared/classes/url.builder';
import { QueryStringParameters } from '../../shared/classes/query-string-parameters';
import { Constants } from '../../..//app/config/constant';

@Injectable({
  providedIn: 'root'
})

@Injectable({
  providedIn: 'root'
})
export class ApiEndpointsService {
  constructor(
    // Application Constants
    private _constants: Constants
  ) { }
  /* #region URL CREATOR */
  // URL
  private createUrl(
    action: string,
    isMockAPI: boolean = false
  ): string {
    const urlBuilder: UrlBuilder = new UrlBuilder(
      isMockAPI ? this._constants.API_MOCK_ENDPOINT :
        this._constants.API_ENDPOINT,
      action
    );
    return urlBuilder.toString();
  }
  // URL WITH QUERY PARAMS
  private createUrlWithQueryParameters(
    action: string,
    queryStringHandler?:
      (queryStringParameters: QueryStringParameters) => void
  ): string {
    const urlBuilder: UrlBuilder = new UrlBuilder(
      this._constants.API_ENDPOINT,
      action
    );
    // Push extra query string params
    if (queryStringHandler) {
      queryStringHandler(urlBuilder.queryString);
    }
    return urlBuilder.toString();
  }

  // URL WITH QUERY PARAMS
  private createUrlWithQueryParametersExclude(
    action: string,
    queryStringHandler?:
      (queryStringParameters: QueryStringParameters) => void
  ): string {
    const urlBuilder: UrlBuilder = new UrlBuilder(
      this._constants.API_ENDPOINT,
      action
    );
    // Push extra query string params
    if (queryStringHandler) {
      queryStringHandler(urlBuilder.queryString);
    }
    return urlBuilder.toString();
  }

  // URL WITH PATH VARIABLES
  private createUrlWithPathVariables(
    action: string,
    pathVariables: any[] = []
  ): string {
    let encodedPathVariablesUrl: string = '';
    // Push extra path variables
    for (const pathVariable of pathVariables) {
      if (pathVariable !== null) {
        encodedPathVariablesUrl +=
          `${encodeURIComponent(pathVariable.toString())}/`;
      }
    }
    const urlBuilder: UrlBuilder = new UrlBuilder(
      this._constants.API_ENDPOINT,
      `${action}${encodedPathVariablesUrl}`
    );
    return urlBuilder.toString();
  }
  /* #endregion */

  private createPostInstallUrl(
    action: string,
    isMockAPI: boolean = false
  ): string {
    const urlBuilder: UrlBuilder = new UrlBuilder(
      isMockAPI ? this._constants.API_MOCK_ENDPOINT :
        '',
      action
    );
    return urlBuilder.toString();
  }

  //Example

  //   public getNewsEndpoint(): string {
  //     return this.createUrl('news');
  //   }

  //   This method will return:
  //    https://domain.com/api/news


  //   public getNewsEndpoint(): string {
  //     return this.createUrl('news', true);
  //   }

  //   This method will return:
  //   https://mock-domain.com/api/news


  //   public getProductListByCountryAndPostalCodeEndpoint(
  //     countryCode: string,
  //     postalCode: string
  //   ): string {
  //     return this.createUrlWithQueryParameters(
  //       'productlist',
  //       (qs: QueryStringParameters) => {
  //         qs.push('countryCode', countryCode);
  //         qs.push('postalCode', postalCode);
  //       }
  //     );
  //   }

  //   This method will return:
  //   https://domain.com/api/productlist?countrycode=en&postalcode=12345


  //   public getDataByIdAndCodeEndpoint(
  //     id: string,
  //     code: number
  //   ): string {
  //     return this.createUrlWithPathVariables('data', [id, code]);
  //   }

  //   This method will return:
  //   https://domain.com/api/data/12/67


  // Now, let’s go to a component and use them all together.

  // constructor(
  //   // Application Services
  //   private apiHttpService: ApiHttpService,
  //   private apiEndpointsService: ApiEndpointsService
  // ) {
  //     ngOnInit() {
  //     this.apiHttpService
  //       .get(this.apiEndpointsService.getNewsEndpoint())
  //       .subscribe(() => {
  //         console.log('News loaded'))
  //       });
  // }

  // public getCSRFEndpoint(): string {
  //   return this.createUrl(this._constants.API_ENDPOINT_CSRF);
  // }

  // public addDelegateEndpoint(): string {
  //   return this.createUrl(this._constants.API_ENDPOINT_addDelegate);
  // }
  // public addSpeakerEndpoint(): string {
  //   return this.createUrl(this._constants.API_ENDPOINT_addSpeaker);
  // }
  // public addpartnerEndpoint(): string {
  //   return this.createUrl(this._constants.API_ENDPOINT_addpartnerr);
  // }

  public registrationEndpoint(): string {
    return this.createUrl(this._constants.API_ENDPOINT_REGISTRATION_ONLINE_ENCRYPT);
  }
  public contectUsEndpoint(): string {
    return this.createUrl(this._constants.API_ENDPOINT_CONTECT_US_ENCRYPT);
  }

  public peacekeeperEndpoint(): string {
    return this.createUrl(this._constants.API_ENDPOINT_PEACEKEEPER_ENCRYPT);
  }

  public checkEmailAndMobileEndpoint(): string {
    return this.createUrl(this._constants.API_ENDPOINT_checkEmailAndMobile);
  }

  public ScannedBadge(): string {
    return this.createUrl(this._constants.API_ENDPOINT_ScannedBadge);
  }

  public user_badge(): string {
    return this.createUrl(this._constants.API_ENDPOINT_user_badge);
  }
  public checkEmailAndMobile_1Endpoint(): string {
    return this.createUrl(this._constants.API_ENDPOINT_checkEmailAndMobile_1);
  }

  public checkEmailAndMobile_2Endpoint(): string {
    return this.createUrl(this._constants.API_ENDPOINT_checkEmailAndMobile_2);
  }



  public registratiotjoinEndpoint(): string {
    return this.createUrl(this._constants.API_ENDPOINT_registratiotjoin);
  }
  public addbrochureEndpoint(): string {
    return this.createUrl(this._constants.API_ENDPOINT_addbrochure);
  }
  public sales_brochureEndpoint(): string {
    return this.createUrl(this._constants.API_ENDPOINT_sales_brochure);
  }
  public captchaEndpoint(): string {
    return this.createUrl(this._constants.API_ENDPOINT_captcha);
  }
  public getDelegateEndpoint(): string {
    return this.createUrl(this._constants.API_ENDPOINT_getDelegate);
  }

  public getPartnerEndpoint(): string {
    return this.createUrl(this._constants.API_ENDPOINT_getPartner);
  }

  public getSpeakerEndpoint(): string {
    return this.createUrl(this._constants.API_ENDPOINT_getSpeaker);
  }

  //approvel

  public getApprovedDelegateEndpoint(): string {
    return this.createUrl(this._constants.API_ENDPOINT_getApprovedDelegate);
  }

  public getApprovedPartnerEndpoint(): string {
    return this.createUrl(this._constants.API_ENDPOINT_getApprovedPartner);
  }

  public getApprovedSpeakerEndpoint(): string {
    return this.createUrl(this._constants.API_ENDPOINT_getApprovedSpeaker);
  }



  public approveRegisrationEndpoint(user_id:any): string {
    return this.createUrl(this._constants.API_ENDPOINT_approveRegisration + '/' + user_id);
  }

  public unapproveRegisrationEndpoint(user_id:any): string {
    return this.createUrl(this._constants.API_ENDPOINT_unapproveRegisration + '/' + user_id);
  }
  public getSpeakersEndpoint(): string {
    return this.createUrl(this._constants.API_ENDPOINT_GET_SPEAKERS);
  }
  public getdatesEndpoint(): string {
    return this.createUrl(this._constants.API_ENDPOINT_getdates);
  }
  public getAllCountrycodeEndpoint(): string {
    return this.createUrl(this._constants.API_ENDPOINT_GET_ALL_COUNTRY_ENCRYPT);
  }
  public getAllCountriesEndpoint(): string {
    return this.createUrl(this._constants.API_ENDPOINT_GET_ALL_COUNTRY);
  }


  public getAllStatesEndpoint(country_id:any): string {
    return this.createUrl(this._constants.API_ENDPOINT_GET_ALL_STATES + '/' + country_id);
  }

  public getAllCitiesEndpoint(state_id:any): string {
    return this.createUrl(this._constants.API_ENDPOINT_GET_ALL_CITIES + '/' + state_id);
  }
  public Download_Badge(): string {
    return this.createUrl(this._constants.API_ENDPOINT_Download_Badge);
  }
  public getPeacekeeper_Badge_Data(id:any) {
    return this.createUrl(this._constants.API_ENDPOINT_DOWNLOAD_PEACEKEEPER_BADGE + id);
  }
  public postCheckoutSessionEndpoint() {
    return this.createUrl(this._constants.API_ENDPOINT_CHECKOUT_SESSION);
  }
  public postVerifySessionEndpoint() {
    return this.createUrl(this._constants.API_ENDPOINT_VERIFY_SESSION_ENCRYPT);
  }

  public getAllCountryForDelegatesEndpoint() {
    return this.createUrl(this._constants.API_ENDPOINT_ALL_COUNTRY_ENCRYPT);
  }

  public getStatesByCountryEndpoint(country_id:any): string {
    return this.createUrlWithQueryParameters(this._constants.API_ENDPOINT_STATE_BY_COUNTRY_ENCRYPT ,
      (qs: QueryStringParameters) => {
        qs.push('encryptedData', country_id);
      }
    );
  }

  public getCityByStateEndpoint(state_id:any): string {
    return this.createUrlWithQueryParameters(this._constants.API_ENDPOINT_CITY_BY_STATE_ENCRYPT ,
      (qs: QueryStringParameters) => {
        qs.push('encryptedData', state_id);
      }
    );
  }

  public getSendOTPEndpoint(): string {
    return this.createUrl(this._constants.API_ENDPOINT_SEND_OTP);
  }

  public getVerifyOTPEndpoint(): string {
    return this.createUrl(this._constants.API_ENDPOINT_VERIFY_OTP);
  }

  public getLookupEndpoint(): string {
    return this.createUrl(this._constants.API_ENDPOINT_GET_LOOKUPDATA);
  }

  public getCreateNominationProfileEndpoint(): string {
    return this.createUrl(this._constants.API_ENDPOINT_CREATE_NOMINATION_PROFILE_ENCRYPT);

  // public postPeaceDeleteAccEndpoint() {
  //   return this.createUrl(this._constants.API_ENDPOINT_VERIFY_SESSION);
  // }
  }

  public postPeaceDeleteAccEndpoint(

    queryParamsObj:any
  ): string {
    return this.createUrlWithQueryParameters(this._constants.API_ENDPOINT_DELETE_PEACEKEEPER_ACC,
      (qs: QueryStringParameters) => {
        qs.push('email', queryParamsObj['email']),
        qs.push('role', queryParamsObj['role'])
      });
  }

  public postCreateDelegateOnlineEndpoint() {
    return this.createUrl(this._constants.API_ENDPOINT_CREATE_ONLINE_DELEGATE_ENCRYPT);
  }

  public postVerifySessionOnlineEndpoint() {
    return this.createUrl(this._constants.API_ENDPOINT_VERIFY_SESSION_ONLINE);
  }

  public postRegistrationOnlineEndpoint(): string {
    return this.createUrl(this._constants.API_ENDPOINT_REGISTRATION_ONLINE);
  }

  public postCreateDelegateOnlineMPEndpoint() {
    return this.createUrl(this._constants.API_ENDPOINT_CREATE_ONLINE_MP);
  }

  public getDataByTransactionIdEndpoint(transactionId:any): string {
    return this.createUrl(this._constants.API_ENDPOINT_GET_DATA_BY_TRANSACTION_ID + '/' + transactionId);
  }

  public postVerifyPaymentStatusEndpoint() {
    return this.createUrl(this._constants.API_ENDPOINT_VERIFY_PAYMENT_STATUS);
  }
  public postPreDelegateNominationEndpoint(): string {
    return this.createUrl(this._constants.API_ENDPOINT_POST_PRE_DELEGATE_NOMINATION_ENCRYPT);
  }

  public getAmbassadorURLEndpoint(): string {
    return this.createUrl(this._constants.API_ENDPOINT_GET_AMBASSADOR);
  }

  public postCreateDelegateOraftEndpoint() {
    return this.createUrl(this._constants.API_ENDPOINT_CREATE_DRAFT_DELEGATE);
  }

  public getCouponValidationEndpoint() {
    return this.createUrl(this._constants.API_ENDPOINT_VALIDATE_COUPON);
  }

    public getAllSpeakersListEndpoint(data:any): string {
    return this.createUrl(this._constants.API_ENDPOINT_GET_SPEAKERS_LIST_ENCRYPT );
  }

}
