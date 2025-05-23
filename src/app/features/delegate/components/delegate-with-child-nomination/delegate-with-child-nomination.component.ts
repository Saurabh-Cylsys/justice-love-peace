import { ChangeDetectorRef, Component, ElementRef, HostListener, Renderer2, ViewChild } from '@angular/core';

import {FormGroup,Validators,FormBuilder,AbstractControl,ValidatorFn,FormControl} from '@angular/forms';
import { NgxUiLoaderService } from 'ngx-ui-loader';
import { Router, ActivatedRoute } from '@angular/router';
import { DelegateService } from '../../services/delegate.service';
import { DatePipe } from '@angular/common';
import { SharedService } from '../../../../shared/services/shared.service';
import {CountryISO,NgxIntlTelInputComponent,PhoneNumberFormat,SearchCountryField} from 'ngx-intl-tel-input';
import { BsDatepickerDirective } from 'ngx-bootstrap/datepicker';
import { EncryptionService } from '../../../../shared/services/encryption.service';


interface PeaceStudentData {
  studentTitle: string
  studentFirstName: string;
  studentLastName: string;
  studentEmail: string;
  studentMobileNumber: string;
  studentCountry_id: string;
  studentDob:string;
  studentRelation:string;
  studentInstituteName :string
  adultTitle: string;
  adultFirstName: string;
  adultLastName: string;
  adultEmail: string;
  adultMobileNumber: string;
  adultCountryId: string;
  transcation_id: string;
  transcation_json: any;

}

@Component({
  selector: 'app-delegate-with-child-nomination',
  templateUrl: './delegate-with-child-nomination.component.html',
  styleUrls: ['./delegate-with-child-nomination.component.css']
})



export class DelegateWithChildNominationComponent {

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
  nomineeName: string = '';
  nomineeDob: string = '';
  nomineeEmail: string = '';
  nomineeRelation: string = '';
  relationData: any = [];
  instituteName: string = '';
  delegateId: any;
  nomineeAge: number = 0;
  userAge: number = 0;
  nominee_mobile_number: any = '';
  userType: string = '';
  showNomineeForm: boolean = false;
  userDob: string = '';
  nomineeFormattedDate: string = '';
  today = new Date();
  isFormDirty: boolean = false;
  previousUserType: any;
  selectedRadioValue: string = '';
  previousType: string = '';

  title :string = "";
  first_name: string = '';
  last_name: string = '';
  email_id :string = '';
  mobileNo: string = '';
  dob: string = '';
  country_code:string = '';
  country_id: string = '';



  peaceStudentData: PeaceStudentData | null = null;
  nominee_CountryCode: any;

  markDirty(): void {
    this.isFormDirty = true;
    // console.log('Form is now dirty'); // Debugging log
  }

  changePreferredCountries() {
    this.preferredCountries = [CountryISO.India, CountryISO.Canada];
  }

  onCountryChange(event: any): void {
    this.selectedCountryISO = event.iso2; // Update the selected country ISO
  }

  constructor(
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

  }

 async ngOnInit() {

  this.ngxService.start();
  setTimeout(() => {

    this.ngxService.stop();
  }, 1500);

    this.checkWindowSize();
    // this.dobValidator();

    this.route.queryParams.subscribe((params: any) => {

       const updatedParams = { ...params };
       if (!updatedParams.code || updatedParams.code === '') {
        delete updatedParams['code'];
      }

       this.router.navigate([], {
         queryParams: updatedParams,
         replaceUrl: true, // Prevents history stack clutter
       });

          this.referralCode = updatedParams.code ? updatedParams.code : null;

          if (params['data']) {
            const decryptedData = this.encryptionService.decryptData(params['data']);

            if (decryptedData) {

              const isNominee = localStorage.getItem('isNominee');

              if(isNominee == 'student') {
                this.title = decryptedData.adultTitle;
                this.first_name =  decryptedData.adultFirstName;
                this.last_name = decryptedData.adultLastName;
                this.country_code = decryptedData.adultCountryCode;
                this.mobile_number = decryptedData.adultMobileNumber;
                this.email_id = decryptedData.adultEmail;
                this.country_id = decryptedData.adultCountryId;
                this.dob = decryptedData.adultDob;
                this.referralCode = decryptedData.reference_no

                this.nomineeName = decryptedData.studentFirstName + ' ' + decryptedData.studentLastName;
                this.nomineeDob =  this.formatDate(decryptedData.studentDob);
                this.nomineeEmail = decryptedData.studentEmail;
                this.nominee_CountryCode = decryptedData.studentCountry_Code;
                this.nominee_mobile_number = decryptedData.studentMobileNumber;
                this.nomineeRelation = decryptedData.studentRelation;
                this.instituteName = decryptedData.studentInstituteName;
              }

              else if(isNominee == 'adult') {
                this.title = decryptedData.studentTitle;
                this.first_name =  decryptedData.studentFirstName;
                this.last_name = decryptedData.studentLastName;
                this.country_code = decryptedData.studentCountry_Code;
                this.mobile_number = decryptedData.studentMobileNumber;
                this.email_id = decryptedData.studentEmail;
                this.country_id = decryptedData.studentCountryId;
                this.dob = decryptedData.studentDob;
                this.referralCode = decryptedData.reference_no

                this.nomineeName = decryptedData.adultFirstName + ' ' + decryptedData.adultLastName;
                this.nomineeDob =  this.formatDate(decryptedData.adultDob);
                this.nomineeEmail = decryptedData.adultEmail;
                this.nominee_CountryCode = decryptedData.adultCountryCode;
                this.nominee_mobile_number = decryptedData.adultMobileNumber;
                this.nomineeRelation = decryptedData.studentRelation;
                this.instituteName = decryptedData.studentInstituteName;
              }

            }
          }
    });

    this.createForm();

    await this.getAllCountries();

    if (this.countryData.length > 0) {

      this.setCountry();
   }
  }

  setCountry() {

    if (!this.countryData || this.countryData.length === 0) {
      // console.log("Country data not loaded yet. Retrying...");
      setTimeout(() => this.setCountry(), 500); // Retry after 500ms
      return;
    }

    const selectedCountry = this.countryData.find((country: any) => country.id == this.country_id);

      if (selectedCountry) {

        const patchFormData = {
          country_id: +this.country_id,
          country: selectedCountry.name
         }
        this.registrationForm.patchValue(patchFormData);


        this.cdr.detectChanges(); // 👈 Force UI update
        const encryptedObj = this.encryptionService.encrypt(this.country_id);

        if (this.country_id) {
          this.ngxService.start();
        this.delegateService.getAllStates(encryptedObj).subscribe(
          (res: any) => {
            this.ngxService.stop();
            let decryptData:any = this.encryptionService.decrypt(res.encryptedData);
            decryptData = JSON.parse(decryptData);
              this.statesData = decryptData.data;
            },
          (err: any) => {
            let decryptErr:any = this.encryptionService.decrypt(err.error.encryptedData);
            decryptErr = JSON.parse(decryptErr);
    
            console.error('Error ', decryptErr); 
                    this.ngxService.stop();
          }
        );
      }

    } else {
      console.warn("Country not found for ID:", this.country_id);
    }
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
      first_name: [this.first_name, [Validators.required]],
      last_name: [this.last_name, [Validators.required]],
      dob: [this.formatDate(this.dob), [Validators.required]],
      country_code: [this.country_code],
      mobile_number: [this.mobile_number, [Validators.minLength(7), Validators.required]],
      email_id: [
        this.email_id,
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
      country_id: [this.country_id, [Validators.required]],
      passport_no: [''],
      passport_issue_by: [''],
      pin_code: [null],
      reference_no: [this.referralCode ? this.referralCode : ''],
      attendee_purpose: ['0', [Validators.required]],
      conference_lever_interest: [[], [Validators.required]], // Initialize as empty array
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

  getAllCountrycode() {
    this.delegateService.getAllCountrycode().subscribe(
      (res: any) => {
        this.code = res.data;
        // Define the country name you want to find (e.g., "India (+91)")
        const countryToFind = 'India (+91)';

        // Find the object that matches the country name
        const indiaCodeObject = this.code.find(
          (item: any) => item.country_mobile_code === countryToFind
        );

        this.registrationForm.patchValue({
          country_code: indiaCodeObject.country_mobile_code,
        });
      },
      (err: any) => {
        console.log('error', err);
      }
    );
  }

  async getAllCountries() {
    try {
      const response = await this.delegateService.getAllCountryApi();
      let decryptData = this.encryptionService.decrypt(response.encryptedData);
      let countryDcrypt = JSON.parse(decryptData);         
      
      this.countryData = countryDcrypt.data;  


    } catch (error) {
      // console.log("Error fetching countries:", error);
    }
    }

  changeCountry(e: any) {
    const selectedValue = e.target.value;
    const countryObj = JSON.parse(selectedValue); // Convert JSON string back to object
    this.registrationForm.patchValue({ country_id: countryObj.id });
    this.country_name = countryObj.name;
    const encryptedObj = this.encryptionService.encrypt(countryObj.id);

    this.ngxService.start();
    this.delegateService.getAllStates(encryptedObj).subscribe(
      (res: any) => {
        this.ngxService.stop();
        let decryptData:any = this.encryptionService.decrypt(res.encryptedData);
        decryptData = JSON.parse(decryptData);
          this.statesData = decryptData.data;
        },
      (err: any) => {
        let decryptErr:any = this.encryptionService.decrypt(err.error.encryptedData);
        decryptErr = JSON.parse(decryptErr);

        console.error('Error ', decryptErr); 
                this.ngxService.stop();
      }
    );
  }

  changeStates(e: any) {
    const selectedValue = e.target.value;
    const stateObj = JSON.parse(selectedValue); // Convert JSON string back to object
    this.registrationForm.patchValue({ state_id: stateObj.id });
    this.state_name = stateObj.name;
    const encryptedObj = this.encryptionService.encrypt(stateObj.id);

    this.ngxService.start();
    this.delegateService.getAllCities(encryptedObj).subscribe((res: any) => {
      let decryptData:any = this.encryptionService.decrypt(res.encryptedData);
      decryptData = JSON.parse(decryptData);
        this.ngxService.stop();
        this.cityData = decryptData.data;
    },     (err: any) => {
      let decryptErr:any = this.encryptionService.decrypt(err.error.encryptedData);
      decryptErr = JSON.parse(decryptErr);

      console.error('Error ', decryptErr); 
              this.ngxService.stop();
    }
  );
  }

  changeCity(e: any) {
    const selectedValue = e.target.value;
    const cityObj = JSON.parse(selectedValue); // Convert JSON string back to object
    this.registrationForm.patchValue({ city_id: cityObj.id });
    this.city_name = cityObj.name;
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
    fieldType: 'website' | 'linkedin'
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
    fieldType: 'website' | 'linkedin'
  ): void {
    if (event.type === 'paste') {
      // Handle paste event
      event.preventDefault();
      const clipboardData =
        (event as ClipboardEvent).clipboardData?.getData('text') || '';

      let allowedPattern: RegExp;
      switch (fieldType) {
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
    // Ensure both ages are defined before proceeding

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
      window.scrollTo({ top: 0, behavior: 'smooth' });
      return;
    }  else if (this.state_name == '' || this.state_name == undefined) {
      setTimeout(() => {
        const stateElement = this.renderer.selectRootElement('#state', true);
        if (stateElement) {
          stateElement.focus();
        }
      }, 100);
      this.SharedService.ToastPopup('Please Select State', '', 'error');
      window.scrollTo({ top: 0, behavior: 'smooth' });
      return;
    } else if (this.city_name == '' || this.city_name == undefined) {
      setTimeout(() => {
        const cityElement = this.renderer.selectRootElement('#city', true);
        if (cityElement) {
          cityElement.focus();
        }
      }, 100);
      this.SharedService.ToastPopup('Please Select City', '', 'error');
      window.scrollTo({ top: 0, behavior: 'smooth' });
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
      window.scrollTo({ top: 0, behavior: 'smooth' });
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
      window.scrollTo({ top: 0, behavior: 'smooth' });
      return;
    } else if (this.nomineeName.length < 2 || this.nomineeName == undefined) {
      this.renderer.selectRootElement('#nominee_name').focus();
      this.SharedService.ToastPopup(
        'Nominee Name must be 2 characters long.',
        '',
        'error'
      );
      window.scrollTo({ top: 0, behavior: 'smooth' });
      return;
    }

    const returnDOB = this.registrationForm.value.dob;

    // Convert "DD/MM/YYYY" → "YYYY-MM-DD"
    const [day, month, year] = returnDOB.split('/');
    const delegateDob = `${year}-${month}-${day}`;

    this.registrationForm.patchValue({
      country_code: this.country_code,
      mobile_number: this.mobile_number,
      dob: delegateDob,
      country: this.registrationForm.value.country,
      state: this.state_name,
      city: this.city_name,
    });

    this.submitted = true;

    if (this.submitted) {
      this.reqBody = {
        ...this.registrationForm.value,
        created_by: 'Admin',
        status: '0',
        is_nomination : "1",
        p_type:"DELEGATE_CHILD_NOMINATION",
        p_reference_by:'0'
      };

      let encryptedObj = this.encryptionService.encrypt(this.reqBody);
      this.ngxService.start();
      let payload = {
        "encryptedData": encryptedObj
      }
      this.SharedService.registration(payload).subscribe({
        next: async (result: any) => {
          let decryptedObj: any = this.encryptionService.decrypt(result.encryptedData);
          decryptedObj = JSON.parse(decryptedObj);
          this.ngxService.stop();
          if (decryptedObj.success) {
            
            this.SharedService.ToastPopup('', decryptedObj.message, 'success');
            this.registrationForm.reset();

            setTimeout(() => {
              this.router.navigateByUrl('/delegate-message');
          }, 3000);

          } else {
            this.SharedService.ToastPopup('', decryptedObj.message, 'error');
          }
        },
        error: (err) => {
          let decryptedErr: any = this.encryptionService.decrypt(err.error.encryptedData);
          decryptedErr = JSON.parse(decryptedErr);
          this.ngxService.stop();

          this.SharedService.ToastPopup('', decryptedErr.message, 'error');
        },
      });
    }
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


  openDatepicker() {
    const dobInput = document.getElementById('dob') as HTMLInputElement;
    if (dobInput) {
      dobInput.click(); // Open ngx-bootstrap datepicker
    }
  }


  // Disable the user type selection
  disableUserTypeChange(): void {
    const checkbox = document.getElementById(
      'userTypeCheckbox'
    ) as HTMLInputElement;
    if (checkbox) {
      checkbox.disabled = true;
    }
  }

  validateNomineeName(event: KeyboardEvent) {
    const inputChar = event.key;

    // Allow alphabets and space (except at the beginning)
    if (!/^[A-Za-z ]$/.test(inputChar) && inputChar !== 'Backspace') {
      event.preventDefault();
    }

    // Prevent space at the beginning
    if (
      event.target instanceof HTMLInputElement &&
      event.target.value.length === 0 &&
      inputChar === ' '
    ) {
      event.preventDefault();
    }
  }
}
