import { Component, OnInit } from '@angular/core';
import { AbstractControl, FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { DelegateService } from '../../services/delegate.service';
import { DomSanitizer, SafeResourceUrl } from '@angular/platform-browser';
import { lastValueFrom, Subscription, timer } from 'rxjs';
import { SharedService } from '../../../../shared/services/shared.service';
import { ActivatedRoute, Router } from '@angular/router';
import { EncryptionService } from '../../../../shared/services/encryption.service';
import { HostListener } from '@angular/core';
import { DatePipe } from '@angular/common';
import { CountryISO, PhoneNumberFormat, SearchCountryField } from 'ngx-intl-tel-input';
import { environment } from '../../../../../environments/environment';
import { NgxUiLoaderService } from 'ngx-ui-loader';

interface RegistrationData {
  // name: string;
  // email: string;
  // mobile_no: string;


  first_name: string,
  last_name: string,
  email_id: string,
  mobile_number: string,
  country_id: string;
  title?: string,
  reference_no?: any,
  dob?: string,
  is_nomination?: string,
  p_type?: string,
  p_reference_by?: string
}

interface CompleteProfileData {
  title: string;
  dob: string;
  profession: string;
  organization_name: string;
  address: string;
  country: string;
  city: string;
}

@Component({
  selector: 'app-delegate-online',
  templateUrl: './delegate-online.component.html',
  styleUrls: ['./delegate-online.component.css']
})
export class DelegateOnlineComponent implements OnInit {
  userForm!: FormGroup;
  completeProfileForm!: FormGroup;
  showPaymentSuccess = false;
  showCompleteProfileForm = false;
  paymentSuccess = false;
  paymentLink: SafeResourceUrl | null = null;
  loading = false;
  registrationData: RegistrationData | null = null;
  sessionId: any;
  isPaymentStatus: any;
  transactionVerified: boolean = false;
  countryData: any = [];
  showCountryDropdown = false;
  filteredCountries: any[] = [];
  selectedCountryName = '';
  referralCode: any = "";
  formattedDateOfBirth: string = '';
  minDate: any;
  maxDate: any;
  colorTheme: string = "theme-dark-blue";
  mobile_numberVal: boolean = false;

  CountryISO = CountryISO;
  PhoneNumberFormat = PhoneNumberFormat;
  preferredCountries: CountryISO[] = [
    CountryISO.UnitedStates,
    CountryISO.UnitedKingdom,
  ];
  selectedCountryISO: any;
  SearchCountryField = SearchCountryField;
  delagateType: string = "";
  pType: string = "";
  payload: any;
  btnDisabled: boolean = false;
  private autoSaveSubscription?: Subscription;
  private isFormSubmitted = false; // Flag to track submission
  isMobileView = false;

  constructor(
    private fb: FormBuilder,
    private delegateService: DelegateService,
    private sanitizer: DomSanitizer,
    private datePipe: DatePipe,
    private sharedService: SharedService,
    private route: ActivatedRoute,
    private encryptionService : EncryptionService,
    private ngxService : NgxUiLoaderService
  ) {
    this.route.queryParams.subscribe((params: any) => {
      if (params != undefined && Object.keys(params).length > 0) {
        this.referralCode = params.code;
        this.delagateType = this.encryptionService.decrypt(params.dType);
        // this.delagateType = params.dType;

        this.fnPartialSave()
        // this.router.navigate([], {
        //   relativeTo: this.route,
        //   queryParams: { '': 'rakesh.gupta.pc' }, // Customize the URL
        //   replaceUrl: true // Replace the current URL in the browser history
        // });
      }
    });

    const today = new Date();
    // Max date is 18 years ago from today
    this.maxDate = new Date(
      today.getFullYear() - 18,
      today.getMonth(),
      today.getDate()
    );

    // Min date is 120 years ago from today
    this.minDate = new Date(today.getFullYear() - 120, 0, 1);
  }

  fnPartialSave() {
    const email = this.userForm?.get('email')?.value;
    const mobile = this.userForm?.get('mobile')?.value;
    const rawMobileNumber = this.userForm?.value.mobile_number?.number ?? '';
    const formattedMobileNumber = rawMobileNumber.replace(/[^0-9]/g, ''); // Keeps only numbers

    if (email || formattedMobileNumber) {

      const payload = {
        title: this.userForm.get('title')?.value ?? '',
        first_name: this.userForm.get('first_name')?.value ?? '',
        last_name: this.userForm.get('last_name')?.value ?? '',
        mobile_number: formattedMobileNumber ?? '',
        email_id: this.userForm.get('email')?.value?.toLowerCase() ?? '',
        country_code: this.userForm.get('mobile_number')?.value?.dialCode ?? '',
        reference_no: (this.referralCode ? this.referralCode : this.userForm.value.reference_no) ?? '',
        dob: this.formattedDateOfBirth ?? '',
        country_id: this.userForm.value.country ?? ''
      };

      try {
        // Convert object to URL-encoded format
        const params = new URLSearchParams();
        Object.entries(payload).forEach(([key, value]) => {
          params.append(key, value);
        });

        // Send data using navigator.sendBeacon()
        //this..sendBeacon(environment.apiUrl + '/pre_delegate_draft_details', params);



        this.delegateService.postDelegateDraft(this.payload).subscribe({
          next: (response: any) => {

          },
          error: (error: any) => {
          }
        });


      } catch (e) {
        console.warn('Draft save failed:', e);
        localStorage.setItem('delegateFormDraft', JSON.stringify(payload));
      }
    }
  }

  async ngOnInit() {

    this.checkWindowSize();
    this.initializeForms();
    await this.getAllCountries();
    this.autoSaveSubscription = timer(0, 60000).subscribe(() => {
      if (!this.isFormSubmitted) {
        this.fnPartialSave();
      }
    });
  }

  validateAlpha(event: KeyboardEvent) {
    const input = event.target as HTMLInputElement;
    const key = event.key;
    const currentValue = input.value;
    const cursorPos = input.selectionStart;

    // Block space at the beginning
    if (key === ' ' && (cursorPos === 0 || currentValue === '')) {
      event.preventDefault();
      return;
    }

    // Allow letters, spaces (not at start),
    const allowedPattern = /^[a-zA-Z\s\'‘]$/;
    if (!allowedPattern.test(key)) {
      event.preventDefault();
    }
  }

  titleValidateAlpha(event: KeyboardEvent) {
    const input = event.target as HTMLInputElement;
    const key = event.key;
    const currentValue = input.value;
    const cursorPos = input.selectionStart;

    // Block space at the beginning
    if (key === ' ' && (cursorPos === 0 || currentValue === '')) {
      event.preventDefault();
      return;
    }

    // Allow letters, spaces (not at start),
    const allowedPattern = /^[a-zA-Z\s\.'‘]$/;
    if (!allowedPattern.test(key)) {
      event.preventDefault();
    }
  }

  getAllCountries() {
    this.delegateService.getAllCountries().subscribe(
      (res: any) => {
        this.countryData = res.data;
      },
      (err: any) => {
        console.log('error', err);
      }
    );
  }

  get f() {
    return this.userForm.controls;
  }

  getcontrol(name: any): AbstractControl | null {
    return this.userForm.get(name);
  }


  handleTabKey(event: KeyboardEvent, nextFieldId: string) {
    if (event.key === 'Tab') {
      event.preventDefault(); // Prevent default tab behavior

      const nextField = document.getElementById(nextFieldId) as HTMLElement;

      if (nextField) {
        nextField.focus();

        // If moving to DOB, open the datepicker
        if (nextFieldId === 'dob') {
          this.openDatepicker();
        }
      }
    }
  }


  moveToReferenceNo() {
    setTimeout(() => {
      const referenceNoField = document.getElementById('reference_no') as HTMLElement;
      if (referenceNoField) {
        referenceNoField.focus();
      }
    }, 100); // Small delay to ensure date selection completes before moving focus
  }


  openDatepicker() {
    const dobInput = document.getElementById('dob') as HTMLInputElement;
    if (dobInput) {
      dobInput.click(); // Open ngx-bootstrap datepicker
    }
  }

  disableManualInput(event: KeyboardEvent): void {
    event.preventDefault();
  }

  private initializeForms() {
    this.userForm = this.fb.group({
      title: ['', [Validators.required, Validators.minLength(2)]],
      first_name: ['', [Validators.required, Validators.minLength(3)]],
      last_name: ['', [Validators.required, Validators.minLength(2)]],
      email: ['',
        [Validators.required,
        Validators.email,
        Validators.pattern('^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\\.[a-zA-Z]{2,4}$')]
      ],
      // countryCode: ['-1', Validators.required],
      mobile_number: ['', [Validators.required, Validators.minLength(7)]],
      country: ['', [Validators.required]],
      dob: ['', [Validators.required]],
      reference_no: [this.referralCode ? this.referralCode : ''],
    });
  }

  validateInput(event: any) {
    const inputType = event.target.id; // Get input field id
    let allowedPattern: RegExp;

    switch (inputType) {
      case 'name': // First name should allow only lowercase, uppercase, and underscore (_)
        allowedPattern = /^[a-zA-Z_]$/;
        break;

      case 'email': // Email should allow letters, numbers, dot (.), and @
        allowedPattern = /^[a-zA-Z0-9.@]$/;
        break;

      case 'mobile': // Mobile number should allow only numbers (0-9)
        allowedPattern = /^[0-9]$/;
        break;

      default:
        return; // Exit if no matching case
    }

    if (!allowedPattern.test(event.key)) {
      event.preventDefault(); // Block invalid characters
    }
  }

  keyPressNumbers(event: KeyboardEvent) {
    const inputElement = event.target as HTMLInputElement; // Get the input field
    const inputId = inputElement.id;

    // Allow only numbers (0-9)
    if (inputId === 'mobile_number') {
      const allowedPattern = /^[0-9]$/;

      if (!allowedPattern.test(event.key)) {
        event.preventDefault(); // Block invalid characters
      }
    }

    // Allow Backspace, Delete, Arrow keys for user convenience
    const allowedKeys = ['Backspace', 'Delete', 'ArrowLeft', 'ArrowRight', 'Tab'];
    if (allowedKeys.includes(event.key)) {
      return; // Allow these keys
    }

    // Prevent non-numeric input
    if (!/^[0-9]$/.test(event.key)) {
      event.preventDefault();
    }

    // Validate mobile number length (min 7 digits)
    const inputValue = this.userForm.controls['mobile_number'].value || ''; // Get value from form control
    this.mobile_numberVal = inputValue.length < 7;
  }

  getPhoneErrorMessage() {
    const control = this.userForm.controls['mobile_number'];
    if (control.value && control.errors) {
      const phoneError = control.errors['validatePhoneNumber']; // Use bracket notation
      if (phoneError?.valid) {
        return '';
      } else {
        return 'Invalid mobile number for selected country.';
      }
    }
    return '';
  }

  onDateChange(event: string): void {
    // Convert the date format
    const parsedDate = new Date(event);
    this.formattedDateOfBirth =
      this.datePipe.transform(parsedDate, 'yyyy-MM-dd') || '';
  }

  private trimValue(value: any): any {
    if (typeof value === 'string') {
      const trimmed = value.trim();
      return trimmed; // returns '' if only whitespace
    }
    return value;
  }

  onSubmit() {

    if (!this.userForm.valid || this.loading) {
      return; // Prevent submission if the form is invalid or loading
    }

    const rawMobileNumber = this.userForm.value.mobile_number.number;
    let formattedMobileNumber = rawMobileNumber.replace(/[^0-9]/g, ''); // Keeps only numbers;

    if (this.userForm.valid) {
      this.loading = true;

      if (this.delagateType == 'offline') {
        this.pType = "DELEGATE_OFFLINE";
      }
      else if (this.delagateType == 'online'){
        this.pType = "DELEGATE_ONLINE";
      }

      if (this.pType == "DELEGATE_ONLINE") {
        this.payload = {
          title: this.trimValue(this.userForm.get('title')?.value),
          first_name: this.trimValue(this.userForm.get('first_name')?.value),
          last_name: this.trimValue(this.userForm.get('last_name')?.value),
          mobile_number: formattedMobileNumber,
          email_id: this.trimValue(this.userForm.get('email')?.value.toLowerCase()),
          country_code: this.userForm.get('mobile_number')?.value.dialCode,
          reference_no: this.referralCode ? this.referralCode : this.userForm.value.reference_no,
          dob: this.formattedDateOfBirth,
          country_id: this.userForm.value.country,
          is_nomination: "1",
          p_type: this.pType,
          p_reference_by: "0"
        };
      }
      else if (this.pType == "DELEGATE_OFFLINE") {
        this.payload = {
          title: this.trimValue(this.userForm.get('title')?.value),
          first_name: this.trimValue(this.userForm.get('first_name')?.value),
          last_name: this.trimValue(this.userForm.get('last_name')?.value),
          mobile_number: formattedMobileNumber,
          email_id: this.trimValue(this.userForm.get('email')?.value?.toLowerCase()),
          country_code: this.userForm.get('mobile_number')?.value.dialCode,
          reference_no: this.referralCode ? this.referralCode : this.userForm.value.reference_no,
          dob: this.formattedDateOfBirth,
          country_id: this.userForm.value.country,
          is_nomination: "0",
          p_type: this.pType,
          p_reference_by: "0"
        };
      }

      this.ngxService.start();
      this.delegateService.postDelegateOnline(this.payload).subscribe({
        next: (response: any) => {
          this.ngxService.stop();
          this.isFormSubmitted = true; // Mark form as submitted
          this.stopAutoSave(); // Stop autosave
          this.btnDisabled = true;
          this.sharedService.ToastPopup(response.message, '', 'success');
          this.registrationData = this.payload;
          this.sharedService.setJWTToken(response.token);

          setTimeout(async () => {
            if (response.isStripe == "true") {
              await this.fnStripePG(response, this.payload);
            }
            else
             {
              await this.fnMagnatiPG(response, this.payload);
             }
          }, 4000);

          this.loading = false;
        },
        error: (error: any) => {
          console.error('Error creating delegate:', error);
          this.sharedService.ToastPopup(error.error?.message || 'Registration failed','', 'error');
          window.scrollTo({ top: 0, behavior: 'smooth' });
          this.loading = false;
          this.ngxService.stop();
          this.isFormSubmitted = true; // Mark form as submitted
          this.stopAutoSave(); // Stop autosave
        }
      });
    }
  }

  private stopAutoSave() {
    if (this.autoSaveSubscription) {
      this.autoSaveSubscription.unsubscribe();
    }
  }

  ngOnDestroy() {
    this.stopAutoSave(); // Cleanup on component destruction
  }

  private async fnStripePG(response: any, payload: any) {
    if (response.success && response.gatewayUrl) {
      window.location.href = response.gatewayUrl;
    } else {
      this.sharedService.ToastPopup('Error', response.message || 'Payment failed', 'error');
    }
  }

  private async fnMagnatiPG(response: any, payload: { title: any; first_name: any; last_name: any; mobile_number: any; email_id: any; country_code: any; reference_no: any; dob: string; country_id: any; is_nomination: string; p_type: string; p_reference_by: string; }) {

    if (response.success) {

      let obj = {
        "email": this.userForm.get('email')?.value.toLowerCase(),
        "pay_type": this.pType,
        "reference_no": (this.referralCode ? this.referralCode : this.userForm.value.reference_no) ?? '',
      };

      this.ngxService.start();
      await this.delegateService.postDelegateOnlineMP(obj).subscribe({
        next: (response: any) => {

          this.ngxService.stop();
          //window.location.href = response.paymentUrl
          // Redirect to the IPG gateway
          const form = document.createElement('form');
          form.method = 'POST';
          form.action = response.gatewayUrl;

          Object.keys(response.formData).forEach((key) => {
            const input = document.createElement('input');
            input.type = 'hidden';
            input.name = key;
            input.value = response.formData[key];
            form.appendChild(input);
          });

          document.body.appendChild(form);
          form.submit();

        },
        error: (error: any) => {
          this.ngxService.stop();
          this.sharedService.ToastPopup(error.error['message'],'','error');
          console.log('Error creating delegate:', error);
          this.loading = false;
        }
      });
    }
  }

  @HostListener('document:click', ['$event'])
  onDocumentClick(event: any) {
    if (!event.target.closest('.position-relative')) {
      this.showCountryDropdown = false;
    }
  }

  changeCountry(e: any) {
    const selectedValue = e.target.value;
    const countryObj = JSON.parse(selectedValue); // Convert JSON string back to object
    this.userForm.patchValue({ country_id: countryObj.id });
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

  onPasteMobileNumber(event: ClipboardEvent) {
    event.preventDefault(); // Block default paste action
    const text = event.clipboardData?.getData('text') || '';

    // Allow only numbers (0-9)
    if (/^\d+$/.test(text)) {
      const input = event.target as HTMLInputElement;
      input.value += text; // Append only valid numbers
      input.dispatchEvent(new Event('input')); // Update Angular form control
    }
  }
}