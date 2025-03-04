import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { ApiEndpointsService } from "../../../../app/core/services/api-endpoints.service";
import { ApiHttpService } from "../../../../app/core/services/api-http.service";


@Injectable({
  providedIn: 'root'
})
export class DelegateService {

  constructor(
    private _apiHttpService: ApiHttpService,
    private _apiEndpointsService: ApiEndpointsService,
    // private translate: TranslateService
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

  getAmbassadorURL(data: any) {
    return this._apiHttpService.post(this._apiEndpointsService.getAmbassadorURLEndpoint(), data)
  }
}
