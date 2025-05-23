import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { ApiEndpointsService } from "../../../../app/core/services/api-endpoints.service";
import { ApiHttpService } from "../../../../app/core/services/api-http.service";
import { HttpHeaders } from '@angular/common/http';
import { SharedService } from '../../../shared/services/shared.service';


@Injectable({
  providedIn: 'root'
})
export class DelegateService {

  constructor(
    private _apiHttpService: ApiHttpService,
    private _apiEndpointsService: ApiEndpointsService,
    // private translate: TranslateService
    private sharedService : SharedService
  ) { }
  getSpeakers() {
    return this._apiHttpService.get(this._apiEndpointsService.getSpeakersEndpoint());
  }

  getdates() {
    return this._apiHttpService.get(this._apiEndpointsService.getdatesEndpoint());
  }
  getAllCountrycode() {
    return this._apiHttpService.get(this._apiEndpointsService.getAllCountrycodeEndpoint());
  }

  getAllCountries() {
    return this._apiHttpService.get(this._apiEndpointsService.getAllCountryForDelegatesEndpoint());
  }

  getAllCountryApi(): Promise<any> {
    return this._apiHttpService.get(this._apiEndpointsService.getAllCountryForDelegatesEndpoint()).toPromise();
  }

  getAllStates(country_id: any) {
    return this._apiHttpService.get(this._apiEndpointsService.getStatesByCountryEndpoint(country_id));
  }

  getAllCities(state_id: any) {
    return this._apiHttpService.get(this._apiEndpointsService.getCityByStateEndpoint(state_id));

  }

  getPeacekeeper_Badge(id: any) {
    return this._apiHttpService.get(this._apiEndpointsService.getPeacekeeper_Badge_Data(id));

  }

  postCheckoutSession(body: any) {
    return this._apiHttpService.post(this._apiEndpointsService.postCheckoutSessionEndpoint(),body);

  }
  postVerifySession(body: any) {
    return this._apiHttpService.post(this._apiEndpointsService.postVerifySessionEndpoint(),body);
  }

  sendOTPApi(body: any){
    return this._apiHttpService.post(this._apiEndpointsService.getSendOTPEndpoint(),body);
  }

  verifyOTPApi(body: any){
    return this._apiHttpService.post(this._apiEndpointsService.getVerifyOTPEndpoint(),body);
  }

  getRelationDataApi(body: any){
    return this._apiHttpService.post(this._apiEndpointsService.getLookupEndpoint(),body);
  }

  getNominationProfileApi(body: any){
    return this._apiHttpService.post(this._apiEndpointsService.getCreateNominationProfileEndpoint(),body);
  }

  // postPeaceDeleteAcc(body: any) {
  //   return this._apiHttpService.post(this._apiEndpointsService.postPeaceDeleteAccEndpoint(),body);

  // }
  postPeaceDeleteAcc(queryParamsObj: any): Observable<any> {

    return this._apiHttpService.delete(this._apiEndpointsService.postPeaceDeleteAccEndpoint(queryParamsObj));
  }

  postDelegateOnline(body: any): Observable<any> {
    return this._apiHttpService.post(this._apiEndpointsService.postCreateDelegateOnlineEndpoint(), body);
  }

  postVerifySessionOnline(body: any) {
    return this._apiHttpService.post(this._apiEndpointsService.postVerifySessionOnlineEndpoint(),body);
  }

 postDelegateOnlineMP(body: any): Observable<any> {
  const jwtToken = this.sharedService.getJWTToken();

  const headers = new HttpHeaders({
    Authorization: `Bearer ${jwtToken}`, // Make sure the backend expects 'Authtoken' and not 'Authorization'
  });
    return this._apiHttpService.post(this._apiEndpointsService.postCreateDelegateOnlineMPEndpoint(), body, {headers});
  }

  getDataByTransactionIdApi(transactionId: any): Observable<any> {

    return this._apiHttpService.get(this._apiEndpointsService.getDataByTransactionIdEndpoint(transactionId));
  }

  postverifyPaymentStatus(body: any): Observable<any> {
    return this._apiHttpService.post(this._apiEndpointsService.postVerifyPaymentStatusEndpoint(), body);
  }
  postPreDelegateNominationApi(body: any): Observable<any> {
    return this._apiHttpService.post(this._apiEndpointsService.postPreDelegateNominationEndpoint(), body);
  }

  getAmbassadorURL(data: any) {
    return this._apiHttpService.post(this._apiEndpointsService.getAmbassadorURLEndpoint(), data)
  }

  postDelegateDraft(body: any): Observable<any> {
    return this._apiHttpService.post(this._apiEndpointsService.postCreateDelegateOraftEndpoint(), body);
  }

  getCouponValidation(body: any): Observable<any> {
    return this._apiHttpService.post(this._apiEndpointsService.getCouponValidationEndpoint(), body);
  }

  getVerifyTicketApi(body:any):Observable<any>{
    return this._apiHttpService.post(this._apiEndpointsService.getVerifyTicketEndpoint(), body);
  }
}
