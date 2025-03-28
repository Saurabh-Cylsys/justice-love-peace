import { Injectable } from '@angular/core';
import { environment } from '../../environments/environment';

@Injectable()
export class Constants {

    public readonly API_ENDPOINT: string = environment.apiUrl;
    public readonly API_MOCK_ENDPOINT: string = environment.apiMockUrl;
    public readonly API_IS_DEVELOPMENT_ENV: boolean = environment.production;


    public readonly API_ENDPOINT_registration: string = 'create-delegate-profile-online'
    public readonly API_ENDPOINT_CONTECT_US: string = 'contact_us'
    public readonly API_ENDPOINT_CONTECT_US_ENCRYPT: string = 'contact_us/encryption'
    
    public readonly API_ENDPOINT_PEACEKEEPER: string = 'create-peacekeeper'
    public readonly API_ENDPOINT_PEACEKEEPER_ENCRYPT: string = 'create-peacekeeper/encryption'
   
    public readonly API_ENDPOINT_DOWNLOAD_PEACEKEEPER_BADGE: string = 'peacekeeper/'

    //payment
    public readonly API_ENDPOINT_CHECKOUT_SESSION: string = 'create_session_stripe'
    // public readonly API_ENDPOINT_VERIFY_SESSION: string = 'registration/verify_session_stripe_payment'

    public readonly API_ENDPOINT_VERIFY_SESSION: string = 'verify_session_stripe_payment_new'
    public readonly API_ENDPOINT_VERIFY_SESSION_ENCRYPT: string = 'verify_session_stripe_payment_new/encryption'

    
    public readonly API_ENDPOINT_checkEmailAndMobile: string = 'registration/delegate/already'
    public readonly API_ENDPOINT_checkEmailAndMobile_1: string = 'registration/partner/already'
    public readonly API_ENDPOINT_checkEmailAndMobile_2: string = 'registration/speaker/already'

    public readonly API_ENDPOINT_ScannedBadge: string = 'registration/scanned_badge'
    public readonly API_ENDPOINT_user_badge: string = 'registration/user_badge'

    public readonly API_ENDPOINT_registratiotjoin: string = 'subscriber/create'
    public readonly API_ENDPOINT_addbrochure: string = 'brochure/create'
    public readonly API_ENDPOINT_sales_brochure: string = 'sales_brochure/create'


    public readonly API_ENDPOINT_captcha: string = 'captcha'
    public readonly API_ENDPOINT_getDelegate: string = 'registration/delegate/non-registered'
    public readonly API_ENDPOINT_getPartner: string = 'registration/partner/non-registered'
    public readonly API_ENDPOINT_getSpeaker: string = 'registration/speaker/non-registered'

    public readonly API_ENDPOINT_getApprovedDelegate: string = 'registration/delegate/approved'
    public readonly API_ENDPOINT_getApprovedPartner: string = 'registration/partner/approved'
    public readonly API_ENDPOINT_getApprovedSpeaker: string = 'registration/speaker/approved'

    public readonly API_ENDPOINT_approveRegisration: string = 'registration/approve'

    public readonly API_ENDPOINT_unapproveRegisration: string = 'registration/unapprove'

    public readonly API_ENDPOINT_getdates:string = 'getDates'
    public readonly API_ENDPOINT_GET_SPEAKERS:string = 'invite_speakers'
    public readonly API_ENDPOINT_GET_getAllCountrycode:string = 'getcountry'
    public readonly API_ENDPOINT_GET_ALL_COUNTRY:string = 'getcountry'
    public readonly API_ENDPOINT_GET_ALL_COUNTRY_ENCRYPT:string = 'getcountry/encryption'
  
    public readonly API_ENDPOINT_GET_ALL_STATES:string = 'getstate'
    public readonly API_ENDPOINT_GET_ALL_STATES_ENCRYPT:string = 'getstate/encryption'
   
    public readonly API_ENDPOINT_GET_ALL_CITIES:string = 'getcity'
    public readonly API_ENDPOINT_GET_ALL_CITIES_ENCRYPT:string = 'getcity/encryption'
   
    public readonly API_ENDPOINT_Download_Badge: string = 'registration/download_badge'

    public readonly API_ENDPOINT_ALL_COUNTRY: string = 'get_delegate_country'
    public readonly API_ENDPOINT_ALL_COUNTRY_ENCRYPT: string = 'get_delegate_country/encryption'
   
    public readonly API_ENDPOINT_STATE_BY_COUNTRY: string = 'get_delegate_state'
    public readonly API_ENDPOINT_STATE_BY_COUNTRY_ENCRYPT: string = 'get_delegate_state_encryption'
  
    public readonly API_ENDPOINT_CITY_BY_STATE: string = 'get_delegate_city'
    public readonly API_ENDPOINT_CITY_BY_STATE_ENCRYPT: string = 'get_delegate_city_encryption'

    public readonly API_ENDPOINT_SEND_OTP: string = 'send-otp'
    public readonly API_ENDPOINT_VERIFY_OTP: string = 'verify-otp'

    public readonly API_ENDPOINT_CREATE_NOMINATION_PROFILE: string = 'registration/create-nomination-profile'
    public readonly API_ENDPOINT_CREATE_NOMINATION_PROFILE_ENCRYPT: string = 'registration/create-nomination-profile/encryption'
   
    public readonly API_ENDPOINT_GET_LOOKUPDATA: string = 'getLookupData'
    public readonly API_ENDPOINT_DELETE_PEACEKEEPER_ACC: string = 'delete-user'

    // public readonly API_ENDPOINT_CREATE_ONLINE_DELEGATE: string = 'create_delgate_online'
    public readonly API_ENDPOINT_VERIFY_SESSION_ONLINE: string = 'verify_session_online'

    public readonly API_ENDPOINT_REGISTRATION_ONLINE: string = 'create-delegate-profile-online'
    public readonly API_ENDPOINT_REGISTRATION_ONLINE_ENCRYPT: string = 'create-delegate-profile-online/encryption'

    // 'create-delegate-profile-short'
    public readonly API_ENDPOINT_CREATE_ONLINE_DELEGATE: string = 'pre_delegate_user'

    public readonly API_ENDPOINT_CREATE_ONLINE_DELEGATE_ENCRYPT: string = 'pre_delegate_user/encryption'


    public readonly API_ENDPOINT_GET_AMBASSADOR : string = 'get_ambassador_by_code'

    public readonly API_ENDPOINT_CREATE_ONLINE_MP: string = 'initiate-payment'

    public readonly API_ENDPOINT_GET_DATA_BY_TRANSACTION_ID: string = 'transaction'

    public readonly API_ENDPOINT_VERIFY_PAYMENT_STATUS : string = 'verify-payment-status'

    public readonly API_ENDPOINT_POST_PRE_DELEGATE_NOMINATION: string ='pre_delegate_nomination'
    public readonly API_ENDPOINT_POST_PRE_DELEGATE_NOMINATION_ENCRYPT: string ='pre_delegate_nomination/encryption'

    public readonly API_ENDPOINT_CREATE_DRAFT_DELEGATE: string = 'pre_delegate_draft_details'

    public readonly API_ENDPOINT_VALIDATE_COUPON: string = 'check_coupon'
    public readonly API_ENDPOINT_GET_SPEAKERS_LIST: string = 'get_speaker_list'

    public readonly API_ENDPOINT_GET_SPEAKERS_LIST_ENCRYPT: string = 'get_speaker_list/encryption'

    public readonly API_ENDPOINT_VERIFY_TICKET: string = 'verify_ticket_id'

    public readonly API_ENDPOINT_DISCOUNT_AMOUNT: string =  'discount_amount'

    public readonly API_ENDPOINT_GET_SPEAKERS_LIST: string = 'get_speaker_list'

}
