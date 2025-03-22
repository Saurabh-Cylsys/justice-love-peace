import { Component } from '@angular/core';
import { AbstractControl, FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { CountryISO, PhoneNumberFormat, SearchCountryField } from 'ngx-intl-tel-input';
import { DelegateService } from '../../services/delegate.service';
import { DatePipe } from '@angular/common';
import { SharedService } from '../../../../shared/services/shared.service';
import { ActivatedRoute } from '@angular/router';
import { EncryptionService } from '../../../../shared/services/encryption.service';
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
  isNominee : boolean = false;
  delegateEmail: string = "";

  constructor(private fb: FormBuilder,
    private delegateService: DelegateService,
    private datePipe: DatePipe,
    private sharedService:SharedService,
    private route: ActivatedRoute,private encryptionService : EncryptionService) {

    this.route.queryParams.subscribe((params: any) => {
      if (params != undefined && Object.keys(params).length > 0) {

        this.referralCode = params.code;
        console.log("Params",params);
        this.delagateType = this.encryptionService.decrypt(params.dType);
        // this.delagateType = params.dType;
        console.log("this.delagateType",this.delagateType);
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

  ngOnInit(){

    this.initializeStudentForm();
    this.initializeDelegateForm();


    this.getAllCountries();
  }

  initializeStudentForm() {
     // Initialize student form
     this.studentForm = this.fb.group({
      title: ['',[Validators.required, Validators.minLength(2)]],
      first_name: ['', [Validators.required, Validators.minLength(3)]],
      last_name: ['', [Validators.required, Validators.minLength(2)]],
      studentDob :['', [Validators.required]],
      mobile_number: ['', [Validators.minLength(7), Validators.required]],
      email: ['', [Validators.required, Validators.email]],
      country: ['', [Validators.required]],
      institutionName: ['', [Validators.required]],
      reference_no: [this.referralCode ? this.referralCode : ''],
      relation: ['']
    });
  }

  initializeDelegateForm(){
    // Initialize delegate form
    this.delegateForm = this.fb.group({
      title: ['',[Validators.required, Validators.minLength(2)]],
      first_name: ['', [Validators.required, Validators.minLength(3)]],
      last_name: ['', [Validators.required, Validators.minLength(2)]],
      mobile_number: ['', [Validators.minLength(7), Validators.required]],
      email: ['', [Validators.required, Validators.email]],
      country: ['', [Validators.required]],
      delegateDob :['', [Validators.required]],
      reference_no: [this.referralCode ? this.referralCode : ''],
      relation : ['']
    });
  }

  // Set user type and move to the first step
  setUserType(type: 'student' | 'delegate',event: Event) {

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

  validateStudentTitle(event: any, controlName: string) {
    debugger
    let inputValue = event.target.value;

    // Remove leading spaces
    inputValue = inputValue.replace(/^\s+/, '');

    // Remove invalid characters except letters, space, hyphen, and underscore
    inputValue = inputValue.replace(/[^a-zA-Z\s\.‘]/g, '');

    // Update the input field
    this.studentForm.controls[controlName].setValue(inputValue, { emitEvent: false });
  }

  validateDelegateTitle(event: any, controlName: string) {
    debugger
    let inputValue = event.target.value;

    // Remove leading spaces
    inputValue = inputValue.replace(/^\s+/, '');

    // Remove invalid characters except letters, space, hyphen, and underscore
    inputValue = inputValue.replace(/[^a-zA-Z\s\.‘]/g, '');

    // Update the input field
    this.delegateForm.controls[controlName].setValue(inputValue, { emitEvent: false });
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
    const dobInput = document.getElementById('dob') as HTMLInputElement;
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

  onMobileKeyDown(event: KeyboardEvent,formType: 'student' | 'delegate'): void {
    // const inputValue = this.studentForm.get('mobile_number')?.value || ''; // Use your actual form group name

    const mobileControl = formType === 'student' ? this.studentForm?.get('mobile_number') : this.delegateForm?.get('mobile_number');

    const inputValue = mobileControl?.value ||  ''; // Use your actual form group name

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
      if(formType == 'student'){
      if (event.code === 'Backspace') {
        if (inputValue.number.length < 7) {
          this.studentMobileNumberVal = true;
        } else {
          this.studentMobileNumberVal = false;
        }
      }
    }
    else if(formType == 'delegate'){
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
        this.countryData = res.data;
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
    if(isNominee == 'adult') {
        this.delegateEmail = this.studentForm.get('email')?.value.toLowerCase();
    }
    else if(isNominee == 'student') {
      this.delegateEmail = this.delegateForm.get('email')?.value.toLowerCase();
    }

    let obj = {
      "email": this.delegateEmail,
      "pay_type": "DELEGATE_CHILD_NOMINATION",
      "reference_no": (this.referralCode ? this.referralCode : this.delegateForm.value.reference_no) ?? '',
    };

    await this.delegateService.postDelegateOnlineMP(obj).subscribe({
      next: (response: any) => {
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
        console.error('Error creating delegate:', error);
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

    const studentrawMobileNumber = this.delegateForm.value.mobile_number.number;
    let studentMobileNumber = studentrawMobileNumber.replace(/[^0-9]/g, ''); // Keeps only numbers;


    if(this.userType === 'student'){

      if (
        this.studentForm?.value?.email?.trim().toLowerCase() ===
        this.delegateForm?.value?.email?.trim().toLowerCase()
      ) {
        this.sharedService.ToastPopup('Both email IDs should not be the same', '', 'error');
        return;
      }


      if(this.delegateForm.value.relation == "") {
        this.sharedService.ToastPopup('Please enter relation','','error');
        return;
      }

      this.requestBody = {

        "title": this.trimValue(this.studentForm.value.title),
        "first_name": this.trimValue(this.studentForm.value.first_name),
        "last_name": this.trimValue(this.studentForm.value.last_name),
        "mobile_number": studentMobileNumber ,
        "email_id": this.trimValue(this.studentForm.value.email),
        "country_code": this.studentForm.value.mobile_number.dialCode,
        "reference_no": this.referralCode ? this.referralCode : this.studentForm.value.reference_no,
        "dob": this.formattedStudentDob,
        "country_id": this.studentForm.value.country,

        "nom_title":  this.trimValue(this.delegateForm.value.title),
        "nom_first_name": this.trimValue(this.delegateForm.value.first_name),
        "nom_last_name":  this.trimValue(this.delegateForm.value.last_name),
        "nom_mobile_number": delegateMobileNumber,
        "nom_country_code": this.delegateForm.value.mobile_number.dialCode,
        "nom_email_id":  this.trimValue(this.delegateForm.value.email),
        "nom_dob":  this.formattedDelagateDob,
        "nom_country_id": this.delegateForm.value.country,

        "nom_relation": this.trimValue(this.delegateForm.value.relation),
        "nom_institution": this.trimValue(this.studentForm.value.institutionName)
      }

      localStorage.setItem('isNominee','adult');
    }
    else if(this.userType === 'delegate'){

      if (
        this.studentForm?.value?.email?.trim().toLowerCase() ===
        this.delegateForm?.value?.email?.trim().toLowerCase()
      ) {
        this.sharedService.ToastPopup('Both email IDs should not be the same', '', 'error');
        return;
      }

      if(this.studentForm.value.relation == "") {
        this.sharedService.ToastPopup('Please enter relation','','error');
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

      localStorage.setItem('isNominee','student');
    }

    this.delegateService.postPreDelegateNominationApi(this.requestBody).subscribe({
      next: async (response: any) => {
        if (response.success) {
          this.sharedService.ToastPopup('', response.message, 'success');

          setTimeout(async () => {

            if(response.isStripe == "true") {
              await this.fnStripePG(response, this.requestBody);
            }
            else
             {
              await this.fnMagnatiPG(response, this.requestBody);
            }
          }, 5000);
        }
      },
      error: (err) => {

        console.error('Error creating delegate:', err);
        this.sharedService.ToastPopup(err.error?.message || 'Registration failed','', 'error');
      },
    })
  }

  }
