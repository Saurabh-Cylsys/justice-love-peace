
import {
  ChangeDetectorRef,
  Component,
  ElementRef,
  HostListener,
  OnInit,
  Renderer2,
  ViewChild,
} from '@angular/core';
import {
  FormGroup,
  Validators,
  FormBuilder,
  AbstractControl,
  ValidatorFn,
  FormControl,
} from '@angular/forms';
import { NgxUiLoaderService } from 'ngx-ui-loader';
import { Router, ActivatedRoute } from '@angular/router';
import { DelegateService } from '../../services/delegate.service';
import { DatePipe } from '@angular/common';
import { SharedService } from '../../../../shared/services/shared.service';
import {
  CountryISO,
  PhoneNumberFormat,
  SearchCountryField,
} from 'ngx-intl-tel-input';
import { BsDatepickerDirective } from 'ngx-bootstrap/datepicker';
import { environment } from '../../../../../environments/environment';
import { param } from 'jquery';
import { EncryptionService } from '../../../../shared/services/encryption.service';

@Component({
  selector: 'app-delegate-registration-online',
  templateUrl: './delegate-registration-online.component.html',
  styleUrls: ['./delegate-registration-online.component.css']
})
export class DelegateRegistrationOnlineComponent {
  showPopup: boolean = false;
  formdisplay: boolean = true;
  display: string = '';
  reqBody: any;
  registrationForm: any = FormGroup;
  submitted = false;
  countryData: any = [];
  statesData: any = [];
  cityData: any = [];
  code: any;
  mobile_number: string = '';
  mobile_numberVal: boolean = false;
  fullURL: string;
  SearchCountryField = SearchCountryField;
  CountryISO = CountryISO;
  PhoneNumberFormat = PhoneNumberFormat;
  preferredCountries: CountryISO[] = [
    CountryISO.UnitedStates,
    CountryISO.UnitedKingdom,
  ];
  selectedCountryISO: any;
  formattedDate: string = '';
  referralCode: any = '';
  minDate: string | null = null;
  maxDate: string | null = null;
  isMobileView = false;
  interests = [
    { value: 'Justice', label: 'Justice' },
    { value: 'Love', label: 'Love' },
    { value: 'Peace', label: 'Peace' },
  ];
  disabledDates: Date[] = [];

  maxDate1: any;
  minDate1: any;
  colorTheme: string = 'theme-dark-blue';
  country_name: any;
  state_name: any;
  city_name: any;
  @ViewChild('number_mobile1', { static: false })
  mobileNumberInput!: ElementRef;
  @ViewChild('dobPicker') dobPicker!: BsDatepickerDirective;
  ipAddress: string = '';
  deviceInfo: any = '';
  isOTPReceive: boolean = false;
  txtVerifyOTP: string = '';
  countdown: number = 100; // 5 minutes in seconds
  timerExpired: boolean = false;
  interval: any;
  buttonText: string = 'Send OTP';
  mediumValue: string | null = '';
  email: string = '';
  mobileNo: string = '';
  name: string = '';
  title : string = '';
  tinyURL: string = environment.tinyUrl;
  isOnline: boolean = false;
  country_id: any;
  country_code: any;
  dob: any;
  isDisabled = true;
  pType: any;
  firstName: any;
  lastName: any;

  constructor(
    private datePipe: DatePipe,
    private formBuilder: FormBuilder,
    private delegateService: DelegateService,
    private SharedService: SharedService,
    private ngxService: NgxUiLoaderService,
    private router: Router,
    private route: ActivatedRoute,
    private renderer: Renderer2,
    private encryptionService: EncryptionService,
    private cdr: ChangeDetectorRef
  ) {
    this.fullURL = window.location.href;

    const today = new Date();

    // Max date is 18 years ago from today
    this.maxDate1 = new Date(
      today.getFullYear() - 18,
      today.getMonth(),
      today.getDate()
    );
    // Min date is 120 years ago from today
    this.minDate1 = new Date(today.getFullYear() - 120, 0, 1);
  }

async ngOnInit() {
  this.isDisabled = true;
    this.checkWindowSize();
    // this.dobValidator();

    this.route.queryParams.subscribe((params: any) => {
      if (params != undefined && Object.keys(params).length > 0) {
        this.referralCode = params.code;

        if (params['data']) {
          const decryptedData = this.encryptionService.decryptData(params['data']);

          if (decryptedData) {
            this.title = decryptedData.title;
            this.email = decryptedData.email;
            this.mobileNo = decryptedData.mobile_no;
            this.firstName = decryptedData.firstName;
            this.lastName = decryptedData.lastName;
            this.isOnline = decryptedData.isOnline;
            this.country_id = decryptedData.country_id
            this.country_code = decryptedData.country_code
            this.dob = decryptedData.dob;
            this.pType = decryptedData.pType;
            this.referralCode = decryptedData.reference_no;
          }
        }
      }
    });

    this.createForm();    // this.getdates()
    await this.getAllCountries();

    console.log("this.countryData", this.countryData);

   if (this.countryData.length > 0) {
       this.setCountry();
    }
  }

  setCountry() {
    const selectedCountry = this.countryData.find((country: any) => country.id == this.country_id);

      if (selectedCountry) {

        // this.registrationForm.patchValue({
        //   country: selectedCountry.name,
        //   country_id: +selectedCountry.id
        // });

        const patchFormData = {
          country_id: +this.country_id,
          country: selectedCountry.name
         }
        this.registrationForm.patchValue(patchFormData);


        this.cdr.detectChanges(); // 👈 Force UI update
        if (this.country_id) {
        this.delegateService.getAllStates(this.country_id).subscribe(
          (res: any) => {
            this.ngxService.stop();
            this.statesData = res.data;
          },
          (err: any) => {
            console.log('Err', err);
          }
        );
      }
      // this.registrationForm.patchValue({ country: selectedCountry });

    } else {
      console.warn("Country not found for ID:", this.country_id);
    }

    console.log("Selected Country:", this.registrationForm.value.country);
    console.log("Selected CountryID:", this.registrationForm.value.country_id);
  }


  changePreferredCountries() {
    this.preferredCountries = [CountryISO.India, CountryISO.Canada];
  }

  onCountryChange(event: any): void {
    this.selectedCountryISO = event.iso2; // Update the selected country ISO
  }


  getcontrol(name: any): AbstractControl | null {
    return this.registrationForm.get(name);
  }
  get instagramProfileControl() {
    return this.registrationForm.get('instagram_profile');
  }
  isInvalidInstagramProfile() {
    return (
      this.instagramProfileControl.hasError('pattern') &&
      this.instagramProfileControl.touched
    );
  }

  get f() {
    return this.registrationForm.controls;
  }

  preventDatepicker(event: Event) {
    // Prevent the datepicker from opening.
    event.preventDefault();
    event.stopPropagation();
  }

  formatDate(dateString: string): string {
    if (!dateString) return '';  // Handle null/undefined case
    const date = new Date(dateString); // Convert to Date object
    const day = String(date.getUTCDate()).padStart(2, '0'); // Ensure two digits
    const month = String(date.getUTCMonth() + 1).padStart(2, '0'); // Months are 0-based
    const year = date.getUTCFullYear();
    return `${day}/${month}/${year}`; // Return formatted date
  }

  createForm() {

    this.registrationForm = this.formBuilder.group({
      title: [this.title, [Validators.required]],
      first_name: [this.firstName, [Validators.required]],
      last_name: [this.lastName, [Validators.required]],
      dob: [this.formatDate(this.dob), [Validators.required]],
      country_code: [this.country_code],
      mobile_number: [this.mobileNo || '', [Validators.minLength(7), Validators.required]],
      email_id: [
        this.email || '',
        [
          Validators.required,
          Validators.email,
          Validators.pattern('^[a-z0-9._%+-]+@[a-z0-9.-]+\\.[a-z]{2,4}$'),
        ],
      ],
      linkedIn_profile: [''],
      instagram_profile: [''],
      profession_1: ['', [Validators.required]],
      profession_2: [''],
      website: [
        '',
        [
          Validators.pattern(
            '^(https?:\\/\\/)?([\\w.-]+)\\.([a-z]{2,6})([\\/\\w .-]*)*\\/?$'
          ),
        ],
      ],
      organization_name: [''],
      address: [''],
      country: ['', [Validators.required]],
      state: ['', [Validators.required]],
      city: ['', [Validators.required]],
      city_id: ['', [Validators.required]],
      state_id: ['', [Validators.required]],
      country_id: ['', [Validators.required]],
      passport_no: [''],
      passport_issue_by: [''],
      pin_code: [null],
      reference_no: [this.referralCode ? this.referralCode : ''],
      attendee_purpose: ['0', [Validators.required]],
      conference_lever_interest: [[], [Validators.required]], // Initialize as empty array
      created_by: 'Admin',
      status: ['0'],
    });
  }

  onCheckboxChange(event: any) {
    const conferenceLeverInterest = this.registrationForm.get(
      'conference_lever_interest'
    );
    if (conferenceLeverInterest) {
      const currentValues = conferenceLeverInterest.value || [];
      if (event.target.checked) {
        // Add the value if checked
        conferenceLeverInterest.setValue([
          ...currentValues,
          event.target.value,
        ]);
      } else {
        // Remove the value if unchecked
        conferenceLeverInterest.setValue(
          currentValues.filter((v: string) => v !== event.target.value)
        );
      }
      conferenceLeverInterest.markAsTouched(); // Mark control as touched
    }
  }

  disableManualInput(event: KeyboardEvent): void {
    event.preventDefault();
  }

  onDateChange(event: string): void {
    // Convert the date format
    const parsedDate = new Date(event);
    this.formattedDate =
      this.datePipe.transform(parsedDate, 'yyyy-MM-dd') || '';
  }

 async getAllCountries() {
  try {
    const response = await this.delegateService.getAllCountryApi();
    this.countryData = response.data;
    console.log("Country Data:", this.countryData);

    // Ensure we bind the country only after fetching data
    if (this.isOnline) {
      this.setCountry();
    }

  } catch (error) {
    console.error("Error fetching countries:", error);
  }
  }

  changeCountry(e: any) {
    const selectedValue = e.target.value;
    const countryObj = JSON.parse(selectedValue); // Convert JSON string back to object
    this.registrationForm.patchValue({ country_id: countryObj.id });
    this.country_name = countryObj.name;

    this.ngxService.start();
    this.delegateService.getAllStates(countryObj.id).subscribe(
      (res: any) => {
        this.ngxService.stop();
        this.statesData = res.data;
      },
      (err: any) => {
        console.log('Err', err);
      }
    );
  }

  changeStates(e: any) {
    const selectedValue = e.target.value;
    const stateObj = JSON.parse(selectedValue); // Convert JSON string back to object
    this.registrationForm.patchValue({ state_id: stateObj.id });
    this.state_name = stateObj.name;

    // this.ngxService.start();
    this.delegateService.getAllCities(stateObj.id).subscribe((res: any) => {
      // this.ngxService.stop();
      this.cityData = res.data;
    });
  }

  changeCity(e: any) {
    const selectedValue = e.target.value;
    const cityObj = JSON.parse(selectedValue); // Convert JSON string back to object
    this.registrationForm.patchValue({ city_id: cityObj.id });
    this.city_name = cityObj.name;
  }

  keyPressNumbers(event: KeyboardEvent, inputValue: any) {
    if (inputValue !== null) {
      if (inputValue.number.length < 7) {
        this.mobile_numberVal = true;
        // event.preventDefault()
      } else {
        this.mobile_numberVal = false;
      }
    }
  }

  onPaste(event: ClipboardEvent) {
    event.preventDefault(); // Block pasting
    const text = event.clipboardData?.getData('text') || '';

    // Allow only alphabets and spaces
    const allowedPattern = /^[a-zA-Z\s\-_‘]$/;
    if (allowedPattern.test(text)) {
      const input = event.target as HTMLInputElement;
      input.value += text; // Append only valid text
      input.dispatchEvent(new Event('input')); // Update Angular form control
    }
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

  onEmailPaste(event: ClipboardEvent) {
    event.preventDefault(); // Block default paste action
    const text = event.clipboardData?.getData('text') || '';

    // Allow only valid email characters (a-z, A-Z, 0-9, @, ., _, -)
    if (/^[a-zA-Z0-9@._-]+$/.test(text)) {
      const input = event.target as HTMLInputElement;
      input.value += text; // Append only valid characters
      input.dispatchEvent(new Event('input')); // Update Angular form control
    }
  }

  onProfessionPaste(event: ClipboardEvent) {
    event.preventDefault(); // Prevent default paste action
    const text = event.clipboardData?.getData('text') || ''; // Get the pasted text

    const validTextPattern = /^[a-zA-Z\s_@&-]*$/;

    // If valid, allow paste; otherwise, show an alert or handle accordingly
    if (validTextPattern.test(text)) {
      const input = event.target as HTMLInputElement;
      input.value = text; // Paste valid text into the input field
      input.dispatchEvent(new Event('input')); // Trigger input event to update Angular form control
    } else {
      event.preventDefault();
    }
  }

  onProfessionInput(event: Event) {
    const input = event.target as HTMLInputElement;

    // Remove leading spaces
    let inputValue = input.value.replace(/^\s+/, '');

    // Allow alphabets, _, @, &, -, and spaces (but no special characters other than these)
    inputValue = inputValue.replace(/[^a-zA-Z_@&-\s]/g, '');

    // Prevent multiple spaces
    inputValue = inputValue.replace(/\s{2,}/g, ' ');

    // Set the cleaned value back to the input field
    this.registrationForm.controls['profession_1'].setValue(inputValue, {
      emitEvent: false,
    });
  }

  onProfession2Input(event: Event) {
    const input = event.target as HTMLInputElement;

    // Remove leading spaces
    let inputValue = input.value.replace(/^\s+/, '');

    // Allow alphabets, _, @, &, -, and spaces (but no special characters other than these)
    inputValue = inputValue.replace(/[^a-zA-Z_@&-\s]/g, '');

    // Prevent multiple spaces
    inputValue = inputValue.replace(/\s{2,}/g, ' ');

    // Set the cleaned value back to the input field
    this.registrationForm.controls['profession_2'].setValue(inputValue, {
      emitEvent: false,
    });
  }

  validateAlpha(event: any) {
    const allowedPattern = /^[a-zA-Z\s\-'_‘]$/;

    if (!allowedPattern.test(event.key)) {
      event.preventDefault(); // Block invalid characters
    }
  }

  validateAddress(event: KeyboardEvent) {
    const allowedPattern = /^[a-zA-Z0-9\s@,.\-_()]*$/;

    if (!allowedPattern.test(event.key)) {
      event.preventDefault(); // Block invalid characters
    }
  }

  validateWebsite(event: any) {
    const allowedPattern = /^[a-zA-Z0-9@._\-/:]+$/;

    if (!allowedPattern.test(event.key)) {
      event.preventDefault(); // Block invalid characters
    }
  }

  onPasteAddress(event: ClipboardEvent) {
    event.preventDefault(); // Block default paste action
    const text = event.clipboardData?.getData('text') || '';

    // Allow only letters, numbers, spaces, and specific special characters
    const allowedPattern = /^[a-zA-Z0-9\s@,.\-_()]+$/;

    if (allowedPattern.test(text)) {
      const input = event.target as HTMLInputElement;
      input.value += text; // Append valid text
      input.dispatchEvent(new Event('input')); // Trigger input event to update Angular form control
    } else {
      this.SharedService.ToastPopup(
        'Only letters, numbers, spaces, and @, . - _ ( ) are allowed.',
        '',
        'error'
      );
    }
  }

  containsConsecutiveZeros(): ValidatorFn {
    return (control: AbstractControl): { [key: string]: any } | null => {
      const value = control.value as string;
      if (value && /000000/.test(value)) {
        return { containsConsecutiveZeros: true };
      }
      return null;
    };
  }

  noRepeatingDigits(): ValidatorFn {
    return (control: AbstractControl): { [key: string]: any } | null => {
      const value = control.value as string;
      if (value && value.length === 10) {
        // Check for repeating digits
        const repeatingDigits = /(.)\1{5,}/.test(value);
        if (repeatingDigits) {
          return { repeatingDigits: true };
        }
      }
      return null;
    };
  }

  getPhoneErrorMessage() {
    const control = this.registrationForm.controls['mobile_number'];
    if (control.value) {
      if (control.errors.validatePhoneNumber['valid']) {
        return '';
      } else {
        return 'Invalid mobile number for selected country.';
      }
    }
    return '';
  }

  onMobileKeyDown(event: KeyboardEvent, inputValue: any): void {
    if (inputValue !== null) {
      // Prevent space at the beginning
      if (
        event.key === ' ' &&
        event.code === 'Space' &&
        inputValue.number.length === 0
      ) {
        event.preventDefault();
        return;
      }

      // Allow only numbers, Backspace, Delete, Arrow Keys, and Tab
      if (
        !/^[0-9]$/.test(event.key) &&
        !['Backspace', 'Delete', 'ArrowLeft', 'ArrowRight', 'Tab'].includes(
          event.key
        )
      ) {
        event.preventDefault();
        return;
      }

      // Handle backspace validation
      if (event.code === 'Backspace') {
        if (inputValue.number.length < 7) {
          this.mobile_numberVal = true;
        } else {
          this.mobile_numberVal = false;
        }
      }
    }
  }

  onKeyDown(
    event: KeyboardEvent,
    fieldType: 'email' | 'website' | 'linkedin'
  ): void {
    if (
      ['Backspace', 'Delete', 'ArrowLeft', 'ArrowRight', 'Tab'].includes(
        event.key
      )
    ) {
      return; // Allow these keys
    }

    if (event.key === ' ' && event.code === 'Space') {
      event.preventDefault(); // Prevent leading spaces
      return;
    }

    let allowedPattern: RegExp;
    switch (fieldType) {
      case 'email':
        allowedPattern = /^[a-zA-Z0-9@._-]$/; // Allowed characters for email
        break;
      case 'website':
        allowedPattern = /^[a-zA-Z0-9.:/_-]$/; // Allowed characters for website
        break;
      case 'linkedin':
        allowedPattern = /^[a-zA-Z0-9.:/_%+-]$/; // Allows LinkedIn profile URLs (including % for encoding)
        break;
      default:
        return;
    }

    if (!allowedPattern.test(event.key)) {
      event.preventDefault(); // Block invalid characters
    }
  }

  onInputEvent(
    event: KeyboardEvent | ClipboardEvent,
    fieldType: 'email' | 'website' | 'linkedin'
  ): void {
    if (event.type === 'paste') {
      // Handle paste event
      event.preventDefault();
      const clipboardData =
        (event as ClipboardEvent).clipboardData?.getData('text') || '';

      let allowedPattern: RegExp;
      switch (fieldType) {
        case 'email':
          allowedPattern = /^[a-zA-Z0-9@._-]+$/; // Allowed characters for email
          break;
        case 'website':
          allowedPattern = /^[a-zA-Z0-9.:/_-]+$/; // Allowed characters for website
          break;
        case 'linkedin':
          allowedPattern = /^[a-zA-Z0-9.:/_%+-]+$/; // Allows LinkedIn profile URLs (including % for encoding)
          break;
        default:
          return;
      }

      if (allowedPattern.test(clipboardData)) {
        const input = event.target as HTMLInputElement;
        input.value += clipboardData; // Append valid text
        input.dispatchEvent(new Event('input')); // Update Angular form control
      } else {
        alert('Invalid characters pasted.');
      }
      return;
    }

    // Handle keydown event
    const keyEvent = event as KeyboardEvent;
    if (
      ['Backspace', 'Delete', 'ArrowLeft', 'ArrowRight', 'Tab'].includes(
        keyEvent.key
      )
    ) {
      return; // Allow these keys
    }

    if (keyEvent.key === ' ' && keyEvent.code === 'Space') {
      keyEvent.preventDefault(); // Prevent leading spaces
      return;
    }

    let allowedPattern: RegExp;
    switch (fieldType) {
      case 'email':
        allowedPattern = /^[a-zA-Z0-9@._-]$/;
        break;
      case 'website':
        allowedPattern = /^[a-zA-Z0-9.:/_-]$/;
        break;
      case 'linkedin':
        allowedPattern = /^[a-zA-Z0-9.:/_%+-]$/;
        break;
      default:
        return;
    }

    if (!allowedPattern.test(keyEvent.key)) {
      keyEvent.preventDefault(); // Block invalid characters
    }
  }

  onPasteEvent(event: ClipboardEvent, fieldType: 'website' | 'linkedin'): void {
    event.preventDefault();
    const clipboardData = event.clipboardData?.getData('text') || '';

    let allowedPattern: RegExp;
    switch (fieldType) {
      case 'website':
        allowedPattern = /^[a-zA-Z0-9.:/_-]+$/;
        break;
      case 'linkedin':
        allowedPattern = /^[a-zA-Z0-9.:/_%+-]+$/;
        break;
      default:
        return;
    }

    if (allowedPattern.test(clipboardData)) {
      const input = event.target as HTMLInputElement;
      input.value += clipboardData; // Append valid text
      input.dispatchEvent(new Event('input')); // Update Angular form control
    } else {
      event.preventDefault();
    }
  }

  onInstagramKeyDown(event: KeyboardEvent) {
    const input = event.target as HTMLInputElement;

    if (event instanceof KeyboardEvent) {
      // Block spaces at the beginning
      if (event.key === ' ' && input.value.length === 0) {
        event.preventDefault();
        return;
      }

      // Allow only letters, numbers, underscores, and dots
      const allowedKeys = /^[a-zA-Z0-9_.]$/;
      if (event.key.length === 1 && !allowedKeys.test(event.key)) {
        event.preventDefault();
      }
    }
  }

  onInstagramPaste(event: ClipboardEvent) {
    event.preventDefault(); // Block pasting

    const text = event.clipboardData?.getData('text') || '';
    const validText = text.replace(/[^a-zA-Z0-9_.]/g, ''); // Remove invalid characters

    if (validText !== text) {
      event.preventDefault();
    }

    const input = event.target as HTMLInputElement;
    input.value = validText; // Only paste valid characters
    input.dispatchEvent(new Event('input')); // Trigger Angular change detection
  }

  ngAfterViewInit() {
    setTimeout(() => {
      document.querySelectorAll('input').forEach((input) => {
        input.setAttribute('autocomplete', 'off');
      });
    });
  }

  submitData(): void {
  if (
      !this.registrationForm.value.profession_1 ||
      this.registrationForm.value.profession_1.trim().length < 2
    ) {
      this.renderer.selectRootElement('#profession1').focus();
      this.SharedService.ToastPopup(
        'Profession must be at least 2 characters long.',
        '',
        'error'
      );
      return;
    } else if (this.state_name == '' || this.state_name == undefined) {
      setTimeout(() => {
        const stateElement = this.renderer.selectRootElement('#state', true);
        if (stateElement) {
          stateElement.focus();
        }
      }, 100);
      this.SharedService.ToastPopup('Please Select State', '', 'error');
      return;
    } else if (this.city_name == '' || this.city_name == undefined) {
      setTimeout(() => {
        const cityElement = this.renderer.selectRootElement('#city', true);
        if (cityElement) {
          cityElement.focus();
        }
      }, 100);
      this.SharedService.ToastPopup('Please Select City', '', 'error');
      return;
    } else if (
      !this.registrationForm.value.attendee_purpose ||
      this.registrationForm.value.attendee_purpose.trim() === ''
    ) {
      this.SharedService.ToastPopup(
        'Please Select Attending purpose',
        '',
        'error'
      );
      return;
    } else if (
      !this.registrationForm.get('conference_lever_interest')?.value ||
      this.registrationForm.get('conference_lever_interest')?.value.length === 0
    ) {
      this.SharedService.ToastPopup(
        'Please select at least one interest.',
        '',
        'error'
      );
      return;
    }

    const returnDOB = this.registrationForm.value.dob;

    // Convert "DD/MM/YYYY" → "YYYY-MM-DD"
    const [day, month, year] = returnDOB.split('/');
    const delegateDob = `${year}-${month}-${day}`;

    this.registrationForm.patchValue({
      dob: delegateDob,
      country: this.registrationForm.value.country,
      state: this.state_name,
      city: this.city_name,
    });

    this.submitted = true;

    if (this.submitted) {

      this.reqBody = {
        ...this.registrationForm.value,
        country_code : this.country_code,
        mobile_number : this.mobileNo,
        is_nomination: "0",
        p_type: this.pType,
        p_reference_by: '0'
      };


      this.ngxService.start();
      this.SharedService.registrationOnline(this.reqBody).subscribe(
        async (result: any) => {
          if (result.success) {
            this.ngxService.stop();
            this.SharedService.ToastPopup('', result.message, 'success');
            this.registrationForm.reset();
            setTimeout(() => {
                this.router.navigateByUrl('/delegate-message');
            }, 3000);

          } else {
            this.ngxService.stop();
            this.SharedService.ToastPopup('', result.message, 'error');
          }
        },
        (err) => {
          this.ngxService.stop();
          this.registrationForm.patchValue({
            dob: returnDOB,
          });

          this.SharedService.ToastPopup('', err.error.message, 'error');
        }
      );
    }
  }

  openPopup() {
    this.showPopup = true;
    this.display = 'block';
    this.formdisplay = false;
  }

  closeModal() {
    this.display = 'none';
    this.showPopup = false;
    this.formdisplay = true;
    this.registrationForm.reset({});
    this.router.navigateByUrl('/home');
  }

  checkWindowSize(): void {
    if (window.innerWidth <= 767) {
      this.SharedService.isMobileView.next(true);
      this.isMobileView = true;
    } else {
      this.SharedService.isMobileView.next(false);
      this.isMobileView = false;
    }
  }

  // Listen to window resize events
  @HostListener('window:resize', ['$event'])
  onResize(event: any): void {
    this.checkWindowSize();
  }

  onInput(event: any, controlName: string) {
    let inputValue = event.target.value.replace(/^\s+/, ''); // Remove leading spaces

    let allowedPattern: RegExp;

    switch (controlName) {
      case 'first_name':
        allowedPattern = /^[a-zA-Z\s'-]+$/; // Allows only alphabets, spaces, and hyphens
        break;
      case 'last_name':
        allowedPattern = /^[a-zA-Z\s-]+$/; // Allows only alphabets, spaces, and hyphens
        break;
      case 'email_id':
        allowedPattern = /^[a-zA-Z0-9@._-]+$/; // Allowed characters for email
        inputValue = inputValue.toLowerCase(); // Convert email to lowercase
        break;
      case 'website':
        allowedPattern = /^[a-zA-Z0-9.:/_-]+$/; // Allowed characters for website
        break;
      case 'linkedin':
        allowedPattern = /^[a-zA-Z0-9.:/_%+-]+$/; // Allows LinkedIn profile URLs
        break;
      case 'title':
        allowedPattern = /^[a-zA-Z]+$/; // **Alphabets only (A-Z, a-z), no spaces**
        break;
      case 'organization_name':
        allowedPattern = /^[a-zA-Z. ]+$/; // Allows alphabets, a single space, and a period (.)
        break;
      default:
        allowedPattern = /.*/; // No restriction for other fields
    }

    // Remove invalid characters dynamically
    inputValue = inputValue
      .split('')
      .filter((char: any) => allowedPattern.test(char))
      .join('');

    // Update the form control with the cleaned value
    this.registrationForm.controls[controlName].setValue(inputValue, {
      emitEvent: false,
    });
  }

  handleTabKey(event: KeyboardEvent, nextFieldId: string) {
    if (event.key === 'Tab') {
      event.preventDefault(); // Prevent default tab behavior

      const nextField = document.getElementById(nextFieldId) as HTMLElement;
      if (nextField) {
        nextField.focus(); // Move focus to DOB field

        // Open the datepicker when moving to DOB field
        if (nextFieldId === 'dob') {
          this.openDatepicker();
        }
      }
    }
  }

  openDatepicker() {
    const dobInput = document.getElementById('dob') as HTMLInputElement;
    if (dobInput) {
      dobInput.click(); // Open ngx-bootstrap datepicker
    }
  }
}

