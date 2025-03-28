import { Component, HostListener } from '@angular/core';
import { AbstractControl, FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { CountryISO, PhoneNumberFormat, SearchCountryField } from 'ngx-intl-tel-input';
import { DelegateService } from '../../services/delegate.service';
import { DatePipe } from '@angular/common';
import { SharedService } from '../../../../shared/services/shared.service';
import { ActivatedRoute } from '@angular/router';
import { EncryptionService } from '../../../../shared/services/encryption.service';
import { NgxUiLoaderService } from 'ngx-ui-loader';
@Component({
  selector: 'app-delegate-peace-student',
  templateUrl: './delegate-peace-student.component.html',
  styleUrls: ['./delegate-peace-student.component.css'],

})
export class DelegatePeaceStudentComponent {
  userType: 'student' | 'delegate' | null = null; // Tracks user selection
  step: number = 1; // Tracks the current step
  studentForm!: FormGroup;
  delegateForm!: FormGroup;
  studentMobileNumberVal: boolean = false;
  deleagetMobileNumberVal: boolean = false;
  countryData: any = [];

  CountryISO = CountryISO;
  PhoneNumberFormat = PhoneNumberFormat;
  preferredCountries: CountryISO[] = [
    CountryISO.UnitedStates,
    CountryISO.UnitedKingdom,
  ];
  selectedCountryISO: any;
  SearchCountryField = SearchCountryField;
  maxDate: any;
  minDate: any;
  formattedDelagateDob: string = '';
  formattedStudentDob: string = '';
  colorTheme: string = 'theme-dark-blue';
  delegateAge: number = 0;
  StudentAge: number = 0;
  studentDob: string = '';
  delegateDob: string = '';
  nomineeFormattedDate: string = "";
  nominee_mobile_number: any;
  delegateId: any;

  minStudentDate!: Date;
  maxStudentDate!: Date;
  minDelegateDate!: Date;
  maxDelegateDate!: Date;
  referralCode: any = "";
  delagateType: any;
  showPaymentSuccess = false;
  requestBody: any;
  isNominee: boolean = false;
  delegateEmail: string = "";
  btnDisabled: boolean = false;
  isMobileView = false;
  previousDobValue: any = null; // Store previous value
  previousDelegateDobValue: any = null; // Store previous value

  constructor(private fb: FormBuilder,
    private delegateService: DelegateService,
    private datePipe: DatePipe,
    private sharedService: SharedService,
    private route: ActivatedRoute, private encryptionService: EncryptionService,
    private ngxService: NgxUiLoaderService) {

    this.route.queryParams.subscribe((params: any) => {
      if (params != undefined && Object.keys(params).length > 0) {

        this.referralCode = params.code;
        if (params['data']) {
          const decryptedData = this.encryptionService.decryptData(params['data']);

          if (decryptedData) {
            this.delagateType = decryptedData.dType;
          }
        }
        console.log('params', params);

        // this.router.navigate([], {
        //   relativeTo: this.route,
        //   queryParams: { '': 'rakesh.gupta.pc' }, // Customize the URL
        //   replaceUrl: true // Replace the current URL in the browser history
        // });
      }
    });

    const today = new Date();

    // Student: Age between 1 to 21 years
    this.maxStudentDate = new Date(today.getFullYear() - 2, today.getMonth(), today.getDate()); // 1 year old
    this.minStudentDate = new Date(today.getFullYear() - 21, today.getMonth(), today.getDate()); // 21 years old

    // Delegate: Must be strictly older than 21 years

    this.maxDelegateDate = new Date(
      today.getFullYear() - 21,
      today.getMonth(),
      today.getDate()
    );

    // Min date is 120 years ago from today
    this.minDelegateDate = new Date(today.getFullYear() - 120, 0, 1);

  }

  ngOnInit() {

    this.initializeStudentForm();
    this.initializeDelegateForm();

    this.getAllCountries();

    setTimeout(() => {
      this.previousDobValue = this.studentForm.get('studentDob')?.value || null;
      this.previousDelegateDobValue = this.delegateForm.get('delegateDob')?.value || null;
    });
  }

  initializeStudentForm() {
    // Initialize student form
    this.studentForm = this.fb.group({
      title: ['', [Validators.required, Validators.minLength(2)]],
      first_name: ['', [Validators.required, Validators.minLength(3)]],
      last_name: ['', [Validators.required, Validators.minLength(2)]],
      studentDob: ['', [Validators.required]],
      mobile_number: ['', [Validators.minLength(7), Validators.required]],
      email: ['', [Validators.required, Validators.email, Validators.pattern('^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\\.[a-zA-Z]{2,4}$')]],
      country: ['', [Validators.required]],
      institutionName: ['', [Validators.required]],
      reference_no: [this.referralCode ? this.referralCode : ''],
      relation: ['']
    });
  }

  initializeDelegateForm() {
    // Initialize delegate form
    this.delegateForm = this.fb.group({
      title: ['', [Validators.required, Validators.minLength(2)]],
      first_name: ['', [Validators.required, Validators.minLength(3)]],
      last_name: ['', [Validators.required, Validators.minLength(2)]],
      mobile_number: ['', [Validators.minLength(7), Validators.required]],
      email: ['', [Validators.required, Validators.email, Validators.pattern('^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\\.[a-zA-Z]{2,4}$')]],
      country: ['', [Validators.required]],
      delegateDob: ['', [Validators.required]],
      reference_no: [this.referralCode ? this.referralCode : ''],
      relation: ['']
    });
  }

  // Set user type and move to the first step
  setUserType(type: 'student' | 'delegate', event: Event) {

    if (this.userType === type) return;

    this.userType = type; // Update only after confirmation
    this.resetForms();
  }

  private resetForms(): void {
    this.initializeStudentForm();
    this.initializeDelegateForm();
    // this.studentForm?.reset();
    // this.delegateForm?.reset();
  }

  getStudentControl(name: string): AbstractControl | null {
    return this.studentForm.get(name);
  }

  getDelegateControl(name: string): AbstractControl | null {
    return this.delegateForm.get(name);
  }

  disableManualInput(event: KeyboardEvent): void {
    event.preventDefault();
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

  handleTabKey(event: KeyboardEvent, nextFieldId: string) {

    if (event.key === 'Tab') {
      event.preventDefault(); // Prevent default tab behavior

      const nextField = document.getElementById(nextFieldId) as HTMLElement;

      if (nextField) {
        nextField.focus();

        // If moving to DOB, open the datepicker
        if (nextFieldId === 'studentDob') {
          this.openDatepicker();
        }
      }
    }
  }

  handleDelegateTabKey(event: KeyboardEvent, nextFieldId: string) {
    if (event.key === 'Tab') {
      event.preventDefault(); // Prevent default tab behavior

      const nextField = document.getElementById(nextFieldId) as HTMLElement;

      if (nextField) {
        nextField.focus();

        // If moving to DOB, open the datepicker
        if (nextFieldId === 'delegateDob') {
          this.openDelageteDatepicker();
        }
      }
    }
  }

  moveToStudentEmail(event: any) {
    if (!event || event === this.previousDobValue) {
      return; // Do nothing if the value is unchanged
    }

    this.previousDobValue = event; // Update the stored value

    setTimeout(() => {
      const referenceNoField = document.getElementById('studentEmail') as HTMLElement;
      if (referenceNoField) {
        referenceNoField.focus();
      }
    }, 300);
  }

  moveToDelegateEmail(event: any) {
    if (!event || event === this.previousDelegateDobValue) {
      return; // Do nothing if the value is unchanged
    }

    this.previousDelegateDobValue = event; // Update the stored value

    setTimeout(() => {
      const referenceNoField = document.getElementById('delegateEmail') as HTMLElement;
      if (referenceNoField) {
        referenceNoField.focus();
      }
    }, 300);
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

  onStudentDobChange(event: string): void {
    // Convert the date format
    const parsedDate = new Date(event);
    this.formattedStudentDob = this.datePipe.transform(parsedDate, 'yyyy-MM-dd') || '';
  }

  onDelegateDobChange(event: string): void {
    // Convert the date format
    const parsedDate = new Date(event);
    this.formattedDelagateDob = this.datePipe.transform(parsedDate, 'yyyy-MM-dd') || '';
  }

  openDatepicker() {
    const dobInput = document.getElementById('studentDob') as HTMLInputElement;
    if (dobInput) {
      dobInput.click(); // Open ngx-bootstrap datepicker
    }
  }

  openDelageteDatepicker() {
    const dobInput = document.getElementById('delegateDob') as HTMLInputElement;
    if (dobInput) {
      dobInput.click(); // Open ngx-bootstrap datepicker
    }
  }

  onMobileKeyDown(event: KeyboardEvent, formType: 'student' | 'delegate'): void {
    // const inputValue = this.studentForm.get('mobile_number')?.value || ''; // Use your actual form group name

    const mobileControl = formType === 'student' ? this.studentForm?.get('mobile_number') : this.delegateForm?.get('mobile_number');

    const inputValue = mobileControl?.value || ''; // Use your actual form group name

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
      if (formType == 'student') {
        if (event.code === 'Backspace') {
          if (inputValue.number.length < 7) {
            this.studentMobileNumberVal = true;
          } else {
            this.studentMobileNumberVal = false;
          }
        }
      }
      else if (formType == 'delegate') {
        if (inputValue && inputValue.number) {
          if (inputValue.number.length < 7) {
            this.deleagetMobileNumberVal = true;
          } else {
            this.deleagetMobileNumberVal = false;
          }
        }
      }
    }
  }

  keyPressNumbersForStudent(event: KeyboardEvent) {
    const inputValue = this.studentForm.controls['mobile_number'].value; // Get value from form control
    if (inputValue && inputValue.number) {
      if (inputValue.number.length < 7) {
        this.studentMobileNumberVal = true;
      } else {
        this.studentMobileNumberVal = false;
      }
    }
  }

  keyPressNumbersForDelegate(event: KeyboardEvent) {
    const inputValue = this.delegateForm.controls['mobile_number'].value; // Get value from form control
    if (inputValue && inputValue.number) {
      if (inputValue.number.length < 7) {
        this.deleagetMobileNumberVal = true;
      } else {
        this.deleagetMobileNumberVal = false;
      }
    }
  }

  getStudentPhoneErrorMessage() {
    const control = this.studentForm.controls['mobile_number'];
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

  getDelegatePhoneErrorMessage() {
    const control = this.delegateForm.controls['mobile_number'];
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

  getAllCountries() {
    this.delegateService.getAllCountries().subscribe(
      (res: any) => {
        let encryptedData = res.encryptedData;
        let decryptData = this.encryptionService.decryptData(encryptedData);
        let countryDcrypt = JSON.parse(decryptData);
        this.countryData = countryDcrypt.data;
      },
      (err: any) => {
        console.log('error', err);
      }
    );
  }

  changeCountry(e: any) {
    const selectedValue = e.target.value;
    console.log('selectedValue', selectedValue);
  }

  // Helper function to trim a string value.
  private trimValue(value: any): any {
    if (typeof value === 'string') {
      const trimmed = value.trim();
      return trimmed; // returns '' if only whitespace
    }
    return value;
  }

  private async fnMagnatiPG(response: any, payload: { title: any; first_name: any; last_name: any; mobile_number: any; email_id: any; country_code: any; reference_no: any; dob: string; country_id: any; is_nomination: string; p_type: string; p_reference_by: string; }) {
    if (response.success) {
      //window.location.href = response.payment_link;

      const isNominee = localStorage.getItem('isNominee');
      if (isNominee == 'adult') {
        this.delegateEmail = this.studentForm.get('email')?.value.toLowerCase();
      }
      else if (isNominee == 'student') {
        this.delegateEmail = this.delegateForm.get('email')?.value.toLowerCase();
      }

      let obj = {
        "email": this.delegateEmail,
        "pay_type": "DELEGATE_CHILD_NOMINATION",
        "reference_no": (this.referralCode ? this.referralCode : this.delegateForm.value.reference_no) ?? '',
      };
      const EncryptData = this.encryptionService.encrypt(obj);
      let reqBody = {
        encryptedData: EncryptData
      }


      await this.delegateService.postDelegateOnlineMP(reqBody).subscribe({
        next: (response: any) => {
          let decryptData:any = this.encryptionService.decrypt(response.encryptedData);
          decryptData = JSON.parse(decryptData);
          console.log(decryptData,'decryptData');
          //window.location.href = response.paymentUrl
          // Redirect to the IPG gateway
          const form = document.createElement('form');
          form.method = 'POST';
          form.action = decryptData.gatewayUrl;

          Object.keys(decryptData.formData).forEach((key) => {
            const input = document.createElement('input');
            input.type = 'hidden';
            input.name = key;
            input.value = decryptData.formData[key];
            form.appendChild(input);
          });

          document.body.appendChild(form);
          form.submit();

        },
        error: (error: any) => {
          let decryptErr:any = this.encryptionService.decrypt(error.error.encryptedData);
          decryptErr = JSON.parse(decryptErr);
          console.error('Error creating delegate:', decryptErr);
          // this.loading = false;
        }
      });
    }
  }

  private async fnStripePG(response: any, payload: any) {
    if (response.success && response.gatewayUrl) {
      window.location.href = response.gatewayUrl;
    } else {
      this.sharedService.ToastPopup('Error', response.message || 'Payment failed', 'error');
    }
  }

  // Handle form submission
  onSubmit() {
    if (this.studentForm.invalid || this.delegateForm.invalid) {
      console.log('Student Form Data:', this.studentForm.value);
      console.log('Delegate Form Data:', this.delegateForm.value);
      this.sharedService.ToastPopup('Please enter required Fields', '', 'error');
      return;
    }

    const delegaterawMobileNumber = this.delegateForm.value.mobile_number.number;
    let delegateMobileNumber = delegaterawMobileNumber.replace(/[^0-9]/g, ''); // Keeps only numbers;

    const studentrawMobileNumber = this.studentForm.value.mobile_number.number;
    let studentMobileNumber = studentrawMobileNumber.replace(/[^0-9]/g, ''); // Keeps only numbers;


    if (this.userType === 'student') {

      if (
        this.studentForm?.value?.email?.trim().toLowerCase() ===
        this.delegateForm?.value?.email?.trim().toLowerCase()
      ) {
        this.sharedService.ToastPopup('Both email IDs should not be the same', '', 'error');
        return;
      }


      if (this.delegateForm.value.relation == "") {
        this.sharedService.ToastPopup('Please enter relation', '', 'error');
        return;
      }

      this.requestBody = {

        "title": this.trimValue(this.studentForm.value.title),
        "first_name": this.trimValue(this.studentForm.value.first_name),
        "last_name": this.trimValue(this.studentForm.value.last_name),
        "mobile_number": studentMobileNumber,
        "email_id": this.trimValue(this.studentForm.value.email),
        "country_code": this.studentForm.value.mobile_number.dialCode,
        "reference_no": this.referralCode ? this.referralCode : this.studentForm.value.reference_no,
        "dob": this.formattedStudentDob,
        "country_id": this.studentForm.value.country,

        "nom_title": this.trimValue(this.delegateForm.value.title),
        "nom_first_name": this.trimValue(this.delegateForm.value.first_name),
        "nom_last_name": this.trimValue(this.delegateForm.value.last_name),
        "nom_mobile_number": delegateMobileNumber,
        "nom_country_code": this.delegateForm.value.mobile_number.dialCode,
        "nom_email_id": this.trimValue(this.delegateForm.value.email),
        "nom_dob": this.formattedDelagateDob,
        "nom_country_id": this.delegateForm.value.country,

        "nom_relation": this.trimValue(this.delegateForm.value.relation),
        "nom_institution": this.trimValue(this.studentForm.value.institutionName)
      }

      localStorage.setItem('isNominee', 'adult');
    }
    else if (this.userType === 'delegate') {

      if (
        this.studentForm?.value?.email?.trim().toLowerCase() ===
        this.delegateForm?.value?.email?.trim().toLowerCase()
      ) {
        this.sharedService.ToastPopup('Both email IDs should not be the same', '', 'error');
        return;
      }

      if (this.studentForm.value.relation == "") {
        this.sharedService.ToastPopup('Please enter relation', '', 'error');
        return;
      }
      this.requestBody = {

        "title": this.trimValue(this.delegateForm.value.title),
        "first_name": this.trimValue(this.delegateForm.value.first_name),
        "last_name": this.trimValue(this.delegateForm.value.last_name),
        "mobile_number": delegateMobileNumber,
        "email_id": this.trimValue(this.delegateForm.value.email),
        "country_code": this.delegateForm.value.mobile_number.dialCode,
        "reference_no": this.referralCode ? this.referralCode : this.delegateForm.value.reference_no,
        "dob": this.formattedDelagateDob,
        "country_id": this.delegateForm.value.country,

        "nom_title": this.trimValue(this.studentForm.value.title),
        "nom_first_name": this.trimValue(this.studentForm.value.first_name),
        "nom_last_name": this.trimValue(this.studentForm.value.last_name),
        "nom_mobile_number": studentMobileNumber,
        "nom_country_code": this.studentForm.value.mobile_number.dialCode,
        "nom_email_id": this.trimValue(this.studentForm.value.email),
        "nom_dob": this.formattedStudentDob,
        "nom_country_id": this.studentForm.value.country,
        "nom_relation": this.trimValue(this.studentForm.value.relation),
        "nom_institution": this.trimValue(this.studentForm.value.institutionName)
      }

      localStorage.setItem('isNominee', 'student');
    }
    const EncryptData = this.encryptionService.encrypt(this.requestBody);
    let payload = {
      encryptedData: EncryptData
    }
    this.ngxService.start();
    this.delegateService.postPreDelegateNominationApi(payload).subscribe({
      next: async (response: any) => {
        let decryptData: any = this.encryptionService.decrypt(response.encryptedData);
        decryptData = JSON.parse(decryptData);
        if (decryptData.success) {
          this.sharedService.ToastPopup('', decryptData.message, 'success');
          this.btnDisabled = true;
          this.ngxService.stop();
          this.sharedService.setJWTToken(decryptData.token);
          setTimeout(async () => {

            if (decryptData.isStripe == "true")
              await this.fnStripePG(decryptData, this.requestBody);
            else
              await this.fnMagnatiPG(decryptData, this.requestBody);
          }, 4000);

        }
      },
      error: (err) => {
        this.ngxService.stop();

        let decryptErr: any = this.encryptionService.decrypt(err.error.encryptedData);
        decryptErr = JSON.parse(decryptErr);
        console.error('Error creating delegate:', decryptErr);
        this.sharedService.ToastPopup('', decryptErr?.message || 'Registration failed', 'error');
        window.scrollTo({ top: 0, behavior: 'smooth' });
      },
    })
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

  // onPasteMobileNumber(event: ClipboardEvent) {
  //   event.preventDefault(); // Block default paste action
  //   const text = event.clipboardData?.getData('text') || '';

  //   // Allow only numbers (0-9)
  //   if (/^\d+$/.test(text)) {
  //     const input = event.target as HTMLInputElement;
  //     input.value += text; // Append only valid numbers
  //     input.dispatchEvent(new Event('input')); // Update Angular form control
  //   }
  // }

  onPasteMobileNumber(event: ClipboardEvent) {
    event.preventDefault(); // Prevent default paste action

    const pastedText = event.clipboardData?.getData('text') || '';
    const onlyNumbers = pastedText.replace(/\D/g, ''); // Remove non-numeric characters

    if (onlyNumbers) {
      const input = event.target as HTMLInputElement;
      const start = input.selectionStart || 0;
      const end = input.selectionEnd || 0;

      // Insert the valid numbers at the cursor position
      const newValue =
        input.value.substring(0, start) + onlyNumbers + input.value.substring(end);

      input.value = newValue;
      input.setSelectionRange(start + onlyNumbers.length, start + onlyNumbers.length);
      input.dispatchEvent(new Event('input')); // Trigger Angular form update
    }
  }



}
