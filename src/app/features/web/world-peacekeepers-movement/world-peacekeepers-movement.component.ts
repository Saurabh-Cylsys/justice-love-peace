import {
  Component,
  ElementRef,
  HostListener,
  Inject,
  OnInit,
  Renderer2,
  TemplateRef,
  ViewChild,
} from '@angular/core';
import {
  FormGroup,
  Validators,
  FormControlName,
  FormBuilder,
  FormArray,
  AbstractControl,
  ValidatorFn,
  FormControl,
} from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { NgxUiLoaderService } from 'ngx-ui-loader';
import { DelegateService } from '../../delegate/services/delegate.service';
import { SharedService } from '../../../../app/shared/services/shared.service';
import html2canvas from 'html2canvas';
import int1TelInput from 'intl-tel-input';
import {
  CountryISO,
  PhoneNumberFormat,
  SearchCountryField,
} from 'ngx-intl-tel-input';
import { environment } from '../../../../environments/environment';
import { DomSanitizer, Meta, Title } from '@angular/platform-browser';
import {
  ImageCroppedEvent,
  ImageTransform,
  LoadedImage,
} from 'ngx-image-cropper';
import { DatePipe, DOCUMENT } from '@angular/common';
import { EncryptionService } from '../../../shared/services/encryption.service';
import { WebService } from '../webz-services/web.service';

@Component({
  selector: 'app-world-peacekeepers-movement',
  templateUrl: './world-peacekeepers-movement.component.html',
  styleUrls: ['./world-peacekeepers-movement.component.css'],
})
export class WorldPeacekeepersMovementComponent implements OnInit {
  peacekeepersForm: any = FormGroup;
  reqBody: any;
  formdisplay: boolean = true;
  showPopup: boolean = false;
  isPeaceOn: number = -1;
  display: string = '';
  code: any;
  submitted = false;
  is_selectedFile: boolean = false;
  countryData: any;
  fileUrl: any;
  isMobile: any;
  mobile_number: string = '';
  mobile_numberVal: boolean = false;

  selectedFile: File | null = null;

  separateDialCode = false;
  SearchCountryField = SearchCountryField;
  CountryISO = CountryISO;
  PhoneNumberFormat = PhoneNumberFormat;
  preferredCountries: CountryISO[] = [
    CountryISO.UnitedStates,
    CountryISO.UnitedKingdom,
  ];
  country_codeList: any;
  countryCodes: any;
  country_code: any;
  defaultCountryISO: any;
  selectedCountryISO: any;
  peacekeeperData: any = [];
  peacekeeperBadgeId: any;
  peacekeeperBadgeResponse: any;
  peacekeeperBadge: any;
  isCheckEmail: boolean = true;
  previewUrl: string | null = null; // Add this to your component

  isMobileView = false;
  // qrCodeData: string  = 'delegate-registration?code=CODZDZ-0000063-W';
  qrCodeData: string | null = null;
  qrCodeImg: any;
  convertedImage: string | null = null;
  isConvertedImage: boolean = true;
  isDragging = false;
  imageChangedEvent: any = '';
  imageFileName: any = '';
  croppedImage: any = '';
  zoomLevel: number = 1; // Initial zoom level
  transform: ImageTransform = {}; // Object for applying transformations
  disabledDates: Date[] = [];
  formattedDate: string = '';
  maxDate1: any;
  minDate1: any;
  colorTheme: string = 'theme-dark-blue';
  btnDisabled: boolean = false;
  peacebookwebAppurl: string = environment.peacebookWebAppUrl;
  currentSection = 'pe1';
  loading = false;
  payload: any;
  onlineDiscount: any;
  peaceKeeperDiscount: any;
  peaceKeeperDescription: any;
  offlineDiscount: any;
  referralCode: string = '';
  isStrip: string = "";
  isCheckReference: boolean = true;
  changePreferredCountries() {
    this.preferredCountries = [CountryISO.India, CountryISO.Canada];
  }

  onCountryChange(event: any): void {
    // console.log('Country Changed:', event); // Logs the selected country
    this.selectedCountryISO = event.iso2; // Update the selected country ISO
  }
  // configOption: ConfigurationOptions = new ConfigurationOptions;

  constructor(private datePipe: DatePipe,
    private formBuilder: FormBuilder,
    private DelegateService: DelegateService,
    private webService: WebService,
    private SharedService: SharedService,
    private ngxService: NgxUiLoaderService,
    private route: ActivatedRoute,
    private router: Router,
    private encryptionService: EncryptionService,
    @Inject(DOCUMENT) private document: Document,
    private renderer: Renderer2
  ) {
    this.defaultCountryISO = CountryISO.UnitedArabEmirates;
    // this.is_selectedFile = false;

    const today = new Date();

    // Max date is 18 years ago from today
    this.maxDate1 = new Date(today.getFullYear() - 18, today.getMonth(), today.getDate());

    // Min date is 120 years ago from today
    this.minDate1 = new Date(today.getFullYear() - 120, 0, 1);
  }

  getcontrol(name: any): AbstractControl | null {
    return this.peacekeepersForm.get(name);
  }
  get f() {
    return this.peacekeepersForm.controls;
  }
  @ViewChild('contentTemplate')
  contentTemplate!: TemplateRef<any>;


  async ngOnInit(): Promise<void> {
    // this.setMetaTags();
    // this.setCanonicalUrl(
    //   'https://www.justice-love-peace.com/world-peacekeepers-movement'
    // );

    this.route.queryParams.subscribe(async (params: any) => {
      if (params != undefined && Object.keys(params).length > 0) {
        this.referralCode = params.code || null;;
        if (params.code) {

          if (this.referralCode) {
            await this.fnValidateCoupon(this.referralCode);

          }
          // this.router.navigate(['/world-peacekeepers-movement'], {
          //   queryParams: this.referralCode ? { code: this.referralCode } : {}, // Pass query params
          //   queryParamsHandling: 'merge', // Preserve existing query params (optional)
          //   relativeTo: this.route, // Stay on the same route
          // })
        }
        else {
          await this.fnValidateCoupon(0);
        }
      } else {
        await this.fnValidateCoupon(0);
      }
    });

    this.checkWindowSize();
    this.getAllCountrycode();
    this.mobile_numberVal = false;
    const inputElement = document.getElementById('phone') as HTMLInputElement;

    if (inputElement != null) {
      const data = int1TelInput(inputElement, {
        initialCountry: 'ae',
        separateDialCode: true,
        utilsScript:
          'https://cdnjs.cloudflare.com/ajax/libs/intl-tel-input/11.0.0/js/utils.js',
      });
      inputElement.addEventListener('countrychange', () => {

        this.countryData = int1TelInput(inputElement, {
          initialCountry: 'ae',
          separateDialCode: true,
          utilsScript:
            'https://cdnjs.cloudflare.com/ajax/libs/intl-tel-input/11.0.0/js/utils.js',
        }).getSelectedCountryData();

      });
    }

    this.btnDisabled = true;

    this.createPeacekeeperForm();

  }

  createPeacekeeperForm() {
    this.peacekeepersForm = this.formBuilder.group({
      full_name: ['', [Validators.required]],
      dob: ['', [Validators.required, this.ageValidator]],
      country: ['', [Validators.required]],
      country_code: [''],
      mobile_number: [
        '',
        [
          Validators.required,
          // Validators.pattern(/^(?!.*(\d)\1{9})(\d{10})$/), // Checks for no repeated digits
          this.noRepeatingDigits(),
          this.containsConsecutiveZeros(),
        ],
      ],
      email_id: ['', [Validators.required, Validators.email]], // Using Validators.email for email format validation
      reference_no: [this.referralCode ? this.referralCode : '', [Validators.required]],
      is_active: 1,
      Check_email: [''],
      // File: ['', [Validators.required]],
    });
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

  ageValidator(control: FormControl) {
    const selectedDate = new Date(control.value);

    // If the selected date is invalid, return an error
    if (isNaN(selectedDate.getTime())) {
      return { invalidDate: true }; // Invalid date format
    }

    const today = new Date();
    const eighteenYearsAgo = new Date(today.getFullYear() - 18, today.getMonth(), today.getDate());

    // If selected date is after or on the date 18 years ago, it's invalid
    if (selectedDate > eighteenYearsAgo) {
      return { ageError: 'Date must be at least 18 years ago' };
    }

    return null; // Valid date
  }

  onPaste(event: ClipboardEvent) {
    event.preventDefault(); // Block pasting
    const text = event.clipboardData?.getData('text') || '';

    // Allow only alphabets and spaces
    if (/^[a-zA-Z\s]*$/.test(text)) {
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

  disableManualInput(event: KeyboardEvent): void {
    event.preventDefault();
  }

  onDateChange(event: string): void {
    // Convert the date format
    const parsedDate = new Date(event);
    this.formattedDate = this.datePipe.transform(parsedDate, 'yyyy-MM-dd') || '';

  }

  get dob() {
    return this.peacekeepersForm.get('dob');
  }

  downloadImage() {
    if (this.peacekeeperBadge) {
      fetch(this.peacekeeperBadge)
        .then(response => response.blob())  // Convert response to Blob
        .then(blob => {
          const url = URL.createObjectURL(blob); // Create an object URL for the blob
          const link = document.createElement('a');
          link.href = url;
          link.download = 'peacekeeper-card.png'; // Ensure it's saved as PNG
          document.body.appendChild(link);
          link.click();
          document.body.removeChild(link);
          URL.revokeObjectURL(url); // Clean up the object URL
        })
        .catch(error => console.error('Error downloading the image:', error));
    }


    setTimeout(() => {
      this.display = 'none';
      this.showPopup = false;
    }, 500);
  }
  openPopup() {
    // this.peacekeeperBadgeId = 495
    if (this.peacekeeperBadgeId) {
      let id = this.peacekeeperBadgeId;
      this.webService.getPeacekeeper_Badge(id).subscribe((res: any) => {
        this.peacekeeperData = res.data;
        this.qrCodeImg = res.QR_code;
        this.fileUrl = this.peacekeeperData.file_urls[0];
      });
    }

    this.showPopup = true;
    this.isPeaceOn = 0;
    this.display = 'block';
    this.formdisplay = false;
  }

  closeModal() {
    this.display = 'none';
    this.showPopup = false;
  }

  isCorrect() {

    if (!this.peacekeepersForm.value.full_name?.trim() || this.peacekeepersForm.value.full_name.trim().length < 3) {
      this.renderer.selectRootElement('#fullName').focus();
      this.SharedService.ToastPopup("Full Name must be at least 3 characters long", '', 'error');
      return;
    }
    else if (this.peacekeepersForm.value.dob == "" || this.peacekeepersForm.value.dob == undefined) {
      this.renderer.selectRootElement('#dob').focus();
      this.SharedService.ToastPopup("Please Select Date Of Birth", '', 'error');
      return;
    }
    else if (this.peacekeepersForm.value.country == "" || this.peacekeepersForm.value.country == undefined) {
      setTimeout(() => {
        const countryElement = this.renderer.selectRootElement('#country', true);
        if (countryElement) {
          countryElement.focus();
        }
      }, 100);
      this.SharedService.ToastPopup("Please select country", '', 'error');
      return;
    }
    else if (this.peacekeepersForm.value.email_id == "" || this.peacekeepersForm.value.email_id == undefined) {
      this.renderer.selectRootElement('#email').focus();
      this.SharedService.ToastPopup("Please Enter Email ID", '', 'error');
      return;
    }
    else if (this.peacekeepersForm.controls['email_id'].invalid) {
      this.renderer.selectRootElement('#email').focus();
      this.SharedService.ToastPopup('Please enter a valid Email ID', '', 'error');
      return;
    }
    else if (this.peacekeepersForm.value.mobile_number == "" || this.peacekeepersForm.value.mobile_number == undefined || this.peacekeepersForm.value.mobile_number == null) {
      setTimeout(() => {
        const inputElement = document.querySelector('#number_mobile1 input') as HTMLInputElement;
        if (inputElement) {
          inputElement.focus();
        } else {
          console.error("Could not find mobile number input field");
        }
      }, 100);
      this.SharedService.ToastPopup("Please Enter  Mobile Number", '', 'error');
      return;
    }
    else if (this.peacekeepersForm.controls['mobile_number'].errors && !this.peacekeepersForm.controls['mobile_number'].errors?.validatePhoneNumber?.valid) {
      setTimeout(() => {
        const inputElement = document.querySelector('#number_mobile1 input') as HTMLInputElement;
        if (inputElement) {
          inputElement.focus();
        } else {
          console.error("Could not find mobile number input field");
        }
      }, 100);
      this.SharedService.ToastPopup("Please enter a valid mobile number for the selected country", '', 'error');
      return;
    }
    else if (this.selectedFile == null || this.selectedFile == undefined) {
      this.SharedService.ToastPopup("Please upload image", '', 'error');
      return;
    }
    else if (this.peacekeepersForm.value.reference_no == "" || this.peacekeepersForm.value.reference_no == undefined) {
      this.renderer.selectRootElement('#reference_no').focus();
      this.SharedService.ToastPopup("Please Enter Reference Number", '', 'error');
      return;
    }


    this.isMobile =
      this.peacekeepersForm.value.mobile_number.dialCode +
      ' ' +
      this.peacekeepersForm.value.mobile_number.number.replace(/[^0-9]/g, ''); // Keeps only numbers;
    this.display = 'block';
    this.showPopup = true;
    this.isPeaceOn = 1;
  }


  async checkRefNo() {
    if (this.peacekeepersForm.value.reference_no.length < 3 || this.peacekeepersForm.value.reference_no == "") {
      this.SharedService.ToastPopup('Reference Number must contain 3 or more characters, maximum of 16.', '', 'error');
      return;
    };
    if (this.peacekeepersForm.value.reference_no.length > 16) {
      this.SharedService.ToastPopup('Ensure that Reference Number has no more than 16 characters.', '', 'error');
      this.peacekeepersForm.controls['reference_no'].reset();
      return;
    }

    let obj = {
      "coupon_code": this.peacekeepersForm.value.reference_no
    }


    const EncryptData = this.encryptionService.encrypt(obj);
    const encryptedPayload = {
      encryptedData: EncryptData,
    };

    console.log("obj", obj);
    await this.webService.getCouponValidation(encryptedPayload).subscribe({
      next: async (response: any) => {
        console.log("response", response);
        let decryptData = this.encryptionService.decrypt(response.encryptedData);
        let resDecrypt = JSON.parse(decryptData);
            if (resDecrypt.success == true && resDecrypt.valid == 1) {
          this.referralCode = this.peacekeepersForm.value.reference_no;
          this.isCheckReference = true;
          await this.fnValidateCoupon(this.referralCode);

          this.peacekeepersForm.patchValue({
            reference_no: this.referralCode
          });
          this.SharedService.ToastPopup('Valid Reference Number', '', 'success');

        }
        else {
          this.peacekeepersForm.controls['reference_no'].reset();
          this.referralCode = '';
          this.isCheckReference = false;
          this.SharedService.ToastPopup('Invalid Reference Number', '', 'error');
        }
      },
      error: (error: any) => {
        this.referralCode = '';
      }
    });

  }


  getAllCountrycode() {
    this.webService.getAllCountrycode().subscribe(
      (res: any) => {

        let encryptedData = res.encryptedData;
        let decryptData = this.encryptionService.decrypt(encryptedData);
        let countryDcrypt = JSON.parse(decryptData);

        this.code = countryDcrypt.data;        // Define the country name you want to find (e.g., "India (+91)")
        const countryToFind = 'India';

        // Find the object that matches the country name
        // const indiaCodeObject =  this.code.find((item:any) => item.name === countryToFind);
        // console.log(indiaCodeObject);

        //     this.peacekeepersForm.patchValue({
        //       country :indiaCodeObject.name
        //     })
      },
      (err: any) => {
        console.log('error', err);
      }
    );
  }
  // profile_picture:[''],

  onDrop(event: DragEvent): void {
    event.preventDefault();
    this.isDragging = false;
    if (event.dataTransfer && event.dataTransfer.files.length > 0) {
      const file = event.dataTransfer.files[0];


      if (file) {
        const validExtensions = ['image/jpg', 'image/jpeg', 'image/png'];
        const minSize = 204800; // 200KB
        const maxSize = 5242880; // 5MB

        // Validate the file type
        if (!validExtensions.includes(file.type)) {
          this.SharedService.ToastPopup('', 'Invalid file type! Please select a JPG or PNG file.', 'error')

          this.is_selectedFile = false;
          return;
        }
        // Validate the file size
        // if (file.size < minSize || file.size > maxSize) {
        //   this.SharedService.ToastPopup('', 'Invalid file size! Please select an image between 200KB to 5MB.', 'error');
        //   this.is_selectedFile = false;
        //   return;
        // }
      }
      else {
        console.log('No file selected.');
      }

      this.selectedFile = event.dataTransfer.files[0];
      this.is_selectedFile = true;
      this.imageFileName = this.selectedFile.name;

      // Update the input field's value programmatically
      const fileInput = document.querySelector(
        'input[type="file"]'
      ) as HTMLInputElement;
      if (fileInput) {
        const dataTransfer = new DataTransfer();
        dataTransfer.items.add(this.selectedFile);
        fileInput.files = dataTransfer.files; // Set the dropped file to the input
      }

      const fileInputEvent = {
        target: {
          files: [this.selectedFile],
        },
      } as any;
      this.fileChangeEvent(fileInputEvent);
    }

  }

  onDragOver(event: DragEvent): void {
    event.preventDefault();
    this.isDragging = true;

    // Add a visual cue for the drag-over state (e.g., border highlight)
  }

  onDragLeave(event: DragEvent): void {
    event.preventDefault();
    this.isDragging = false;

    // Remove the visual cue for the drag-over state
  }

  fileChangeEvent(event: any): void {
    this.imageChangedEvent = event;
    // Open the popup for cropping
    this.isPeaceOn = 2;
    this.showPopup = true;
    this.display = 'block';
    this.formdisplay = false;
  }

  // Handle the file selection from the input element
  onFileSelect(event: Event): void {

    const target = event.target as HTMLInputElement;
    if (target.files && target.files.length > 0) {
      this.selectedFile = target.files[0];
      this.is_selectedFile = true;

    }
  }

  onFileChange(event: any): void {

    this.imageChangedEvent = event;
    this.imageFileName = event.target.files[0].name;
    const file = event.target.files[0];

    if (file) {
      const validExtensions = ['image/jpg', 'image/jpeg', 'image/png'];
      const minSize = 204800; // 200KB
      const maxSize = 5242880; // 5MB

      // Validate the file type
      if (!validExtensions.includes(file.type)) {
        this.SharedService.ToastPopup('', 'Invalid file type! Please select a JPG or PNG file.', 'error')
        event.target.value = ''; // Reset the file input
        this.is_selectedFile = false;
        return;
      }
      // Validate the file size
      // if (file.size < minSize || file.size > maxSize) {
      //   this.SharedService.ToastPopup('', 'Invalid file size! Please select an image between 200KB to 5MB.', 'error');
      //   event.target.value = ''; // Reset the file input
      //   this.is_selectedFile = false;
      //   return;
      // }

      this.isPeaceOn = 2;
      this.showPopup = true;
      this.display = 'block'
      this.formdisplay = false;

    }
    else {
      console.log('No file selected.');
    }

  }


  imageCropped(event: ImageCroppedEvent): void {
    this.croppedImage = event.objectUrl;

    // Assuming 'event.objectUrl' is the Blob URL returned from the cropper
    fetch(this.croppedImage)
      .then((response) => response.blob()) // Fetch the image blob
      .then((blob) => {
        // Create a File object from the Blob
        const file = new File([blob], this.imageFileName, {
          type: blob.type,
          lastModified: Date.now(), // You can set this to the actual last modified timestamp if needed
        });

        // Now you can append the file data to your payload
        const payload = {
          file: file,
          otherData: 'your other data here',
        };

        const newFile = file;
        if (newFile) {
          this.selectedFile = newFile;
          this.is_selectedFile = true;
        }
        const reader = new FileReader();
        reader.onload = (e: any) => {
          this.previewUrl = e.target.result; // Set the preview URL
        };
        reader.readAsDataURL(newFile);

        // Proceed with your request or any other operation with 'payload'
      })
      .catch((error) => {
        console.error('Error fetching the image:', error);
      });
  }

  closeImageModal() {
    const fileInput = document.querySelector(
      'input[type="file"]'
    ) as HTMLInputElement;
    fileInput.value = '';
    this.is_selectedFile = false;
    this.display = 'none';
    this.showPopup = false;
    this.selectedFile = null;
  }

  imageLoaded() {
    // Optional: Image loaded event
  }

  cropperReady() {
    this.imageChangedEvent = '';
    this.display = 'none';
    this.showPopup = false;
  }

  // Zoom In
  zoomIn(): void {
    if (this.zoomLevel < 5) {
      // Maximum zoom level
      this.zoomLevel += 0.1;
      this.applyZoom();
    }
  }

  // Zoom Out
  zoomOut(): void {
    if (this.zoomLevel > 1) {
      // Minimum zoom level
      this.zoomLevel -= 0.1;
      this.applyZoom();
    }
  }

  // Apply Zoom
  applyZoom(): void {
    this.transform = {
      ...this.transform,
      scale: this.zoomLevel, // Apply zoom level
    };
  }

  loadImageFailed() {
    // Optional: Image load failed event
  }


  validateAlpha(event: any, controlName: string) {
    let inputValue = event.target.value;

    // Remove leading spaces
    inputValue = inputValue.replace(/^\s+/, '');

    // Remove invalid characters except letters, space, hyphen, and underscore
    inputValue = inputValue.replace(/[^a-zA-Z\s\-_.‘]/g, '');

    // Update the input field
    this.peacekeepersForm.controls[controlName].setValue(inputValue, { emitEvent: false });
  }

  extractCountryCode(inputString: string): string | null {
    const countryCodeMatch = inputString.match(/\(\+(\d+)\)/);
    return countryCodeMatch ? `+${countryCodeMatch[1]}` : null;
  }

  submitData(fileInput: HTMLInputElement): void {

    this.convertedImage = '';
    this.display = 'none';
    this.showPopup = false;

    const returnmobileNumber = this.peacekeepersForm.value.mobile_number;
    const returnDOB = this.peacekeepersForm.value.dob;

    const rawMobileNumber = this.peacekeepersForm.value.mobile_number.number;
    const formattedMobileNumber = rawMobileNumber.replace(/[^0-9]/g, ''); // Keeps only numbers

    this.isCheckEmail = this.peacekeepersForm.value.Check_email;
    this.peacekeepersForm.patchValue({
      is_active: 1,
      Check_email: this.peacekeepersForm.value.Check_email == true ? 1 : 0,
      // country_code: this.peacekeepersForm.value.mobile_number.countryCode,
      mobile_number:
        this.peacekeepersForm.value.mobile_number.dialCode +
        ' ' +
        formattedMobileNumber,
      dob: this.formattedDate

    });

    // Create FormData object
    // Create FormData object
    this.payload = {
      full_name: this.peacekeepersForm.value.full_name,
      dob: this.peacekeepersForm.value.dob,
      country: this.peacekeepersForm.value.country,
      country_code: this.peacekeepersForm.value.country_code,
      mobile_number: this.peacekeepersForm.value.mobile_number,
      email_id: this.peacekeepersForm.value.email_id,
      is_active: this.peacekeepersForm.value.is_active,
      reference_no: this.referralCode ? this.referralCode : this.peacekeepersForm.value.reference_no,
      Check_email: this.peacekeepersForm.value.Check_email == true ? 1 : 0,
      url: environment.domainUrl,
    };


    const EncryptData = this.encryptionService.encrypt(this.payload);
    const encryptedPayload = new FormData();
    encryptedPayload.append('encryptedData', EncryptData);
    this.getAllCountrycode();

    if (this.selectedFile) {
      encryptedPayload.append(
        'profile_picture',
        this.selectedFile,
        this.selectedFile.name
      );
    }


    // // Create FormData object
    // const formData = new FormData();

    // // Append all form fields except the file
    // Object.keys(this.peacekeepersForm.value).forEach((key) => {
    //   formData.append(key, this.peacekeepersForm.value[key]);
    // });

    // // Append the selected file
    // if (this.selectedFile) {
    //   formData.append(
    //     'profile_picture',
    //     this.selectedFile,
    //     this.selectedFile.name
    //   );
    // }
    // formData.append('url', environment.domainUrl);


    // Show loader
    this.ngxService.start();

    // Call the service to submit data
    this.SharedService.postPeacekeeper(encryptedPayload).subscribe(
      (response: any) => {
        let decryptData: any = this.encryptionService.decrypt(response.encryptedData);
        decryptData = JSON.parse(decryptData);

        if (decryptData.success) {
          this.submitted = true;
          this.SharedService.ToastPopup('', decryptData.message, 'success');
          // this.btnDisabled = false;
          setTimeout(async () => {
            if (decryptData.IsStripe == "true")
              await this.fnStripePG(decryptData, this.payload);
            else
              await this.fnMagnatiPG(decryptData, this.payload);
          }, 4000);

          this.loading = false;
          this.ngxService.stop();
          // this.peacekeeperBadgeResponse = response.QR_code
          // this.peacekeeperBadgeResponse =
          //   'https://devglobaljusticeapis.cylsys.com/uploads/delegates/COIEIE-0000069-W.png';
          // this.peacekeeperBadge = decryptData.batch;

          // this.peacekeeperBadgeId = decryptData.peacekeeper_id;
          this.is_selectedFile = false;
          this.peacekeepersForm.reset();

          this.selectedFile = null;
          fileInput.value = '';
          this.previewUrl = '';
        } else {
          this.ngxService.stop();
          this.SharedService.ToastPopup('', decryptData.message, 'error');
        }
      },
      (err) => {
        let decryptErr: any = this.encryptionService.decrypt(err.error.encryptedData);
        decryptErr = JSON.parse(decryptErr);
        this.peacekeepersForm.patchValue({
          mobile_number: returnmobileNumber,
          dob: returnDOB,
        });
        this.ngxService.stop();

        this.SharedService.ToastPopup('', decryptErr.message, 'error');
      }
    );
  }

  private async fnStripePG(response: any, payload: any) {
    if (response.success && response.discount_url) {
      window.location.href = response.discount_url;
    } else {
      this.SharedService.ToastPopup('Error', response.message || 'Payment failed', 'error');
    }
  }

  private async fnMagnatiPG(response: any, payload: { title: any; first_name: any; last_name: any; mobile_number: any; email_id: any; country_code: any; reference_no: any; dob: string; country_id: any; is_nomination: string; p_type: string; p_reference_by: string; }) {

    if (response.success) {

      let obj = {
        "email": this.peacekeepersForm.get('email')?.value.toLowerCase(),
      };

      const EncryptData = this.encryptionService.encrypt(obj);
      let reqBody = {
        encryptedData: EncryptData
      }


      this.ngxService.start();
      await this.webService.postPeaceBookPayMP(reqBody).subscribe({
        next: (response: any) => {
          let decryptData: any = this.encryptionService.decrypt(response.encryptedData);
          decryptData = JSON.parse(decryptData);
          this.ngxService.stop();
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
          let decryptErr: any = this.encryptionService.decrypt(error.error.encryptedData);
          decryptErr = JSON.parse(decryptErr);
          console.error('Error creating delegate:', decryptErr);
          this.ngxService.stop();
          this.SharedService.ToastPopup(decryptErr['message'], '', 'error');
          this.loading = false;
        }
      });
    }
  }



  onMobileNumberKeyDown(event: KeyboardEvent, inputValue: any): void {

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

      // Allow only numbers and essential keys
      if (
        !/^[0-9]$/.test(event.key) &&
        !['Backspace', 'Delete', 'ArrowLeft', 'ArrowRight', 'Tab'].includes(
          event.key
        )
      ) {
        event.preventDefault();
        return;
      }
    }

  }


  keyPressNumbers(event: KeyboardEvent, inputValue: any) {
    //
    if (inputValue !== null) {
      if (inputValue.number.length < 7) {
        this.mobile_numberVal = true;
        // event.preventDefault()
      } else {
        this.mobile_numberVal = false;
      }
    }
  }

  onKeyDownEmail(event: any): void {
    // Allow navigation & correction keys
    if (['Backspace', 'Delete', 'ArrowLeft', 'ArrowRight', 'Tab'].includes(event.key)) {
      return; // Allow these keys
    }

    // Prevent space at any position
    if (event.key === ' ' && event.code === 'Space') {
      event.preventDefault();
      return;
    }

    // Allowed characters: Letters, Numbers, @, ., _, and -
    const allowedPattern = /^[a-zA-Z0-9@._-]$/;

    if (!allowedPattern.test(event.key)) {
      event.preventDefault(); // Block invalid characters
    }
  }


  onKeyDown(event: KeyboardEvent, inputValue: any): void {
    // Check if the pressed key is the space bar and the input is empty
    if (event.key === ' ' && inputValue.trim() === '') {
      event.preventDefault(); // Prevent the space character from being typed
    }
  }

  onMobileKeyDown(event: KeyboardEvent, inputValue: any): void {
    // Check if the pressed key is the space bar and the input is empty
    if (inputValue !== null) {
      if (event.key === ' ' && inputValue.trim() === '') {
        event.preventDefault(); // Prevent the space character from being typed
      } else if (event.code === 'Backspace') {
        if (inputValue.number.length < 7) {
          this.mobile_numberVal = true;
          // event.preventDefault()

        } else {
          this.mobile_numberVal = false;
        }
      }
    }
  }

  getPhoneErrorMessage() {
    const control = this.peacekeepersForm.controls['mobile_number'];
    if (control.value) {
      if (control.errors.validatePhoneNumber['valid']) {
        return '';
      } else {
        return 'Invalid mobile number for selected country.';
      }
    }
    return '';
  }


  getCountrycode(code: any) {
    let countryName = this.peacekeepersForm.value.country;
    const indiaCodeObject = code.find((item: any) => item.name === countryName);

    this.peacekeepersForm.patchValue({
      // is_active :1,
      // Check_email:this.peacekeepersForm.value.Check_email == true? 1 : 0,
      country_code: indiaCodeObject.code,
      // mobile_number: this.peacekeepersForm.value.mobile_number.dialCode + ' ' + formattedMobileNumber
    });
  }

  ngAfterViewInit(): void {
    this.route.fragment.subscribe((fragment) => {
      if (fragment) {
        const element = document.getElementById(fragment);
        if (element) {
          element.scrollIntoView({ behavior: 'smooth' });
        }
      }
    });
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

  downloadQRCode(parent: any) {
    //

    let parentElement = null;

    if (parent.elementType === 'canvas') {
      // fetches base 64 data from canvas
      parentElement = parent.qrcElement.nativeElement
        .querySelector('canvas')
        .toDataURL('image/png');
    } else if (this.qrCodeData === 'img' || this.qrCodeData === 'url') {
      // fetches base 64 data from image
      // parentElement contains the base64 encoded image src
      // you might use to store somewhere
      parentElement = parent.qrcElement.nativeElement.querySelector('img').src;
    } else {
      alert("Set elementType to 'canvas', 'img' or 'url'.");
    }

    if (parentElement) {
      // converts base 64 encoded image to blobData
      let blobData = this.convertBase64ToBlob(parentElement);
      // saves as image
      const blob = new Blob([blobData], { type: 'image/png' });
      const url = window.URL.createObjectURL(blob);
      const link = document.createElement('a');
      link.href = url;
      // name of the file
      link.download = 'qrcode';
      link.click();
    }
  }

  private convertBase64ToBlob(Base64Image: any) {

    const parts = Base64Image.split(';base64,');

    const imageType = parts[0].split(':')[1];

    const decodedData = window.atob(parts[1]);

    const uInt8Array = new Uint8Array(decodedData.length);

    for (let i = 0; i < decodedData.length; ++i) {
      uInt8Array[i] = decodedData.charCodeAt(i);
    }
    return new Blob([uInt8Array], { type: imageType });
  }


  onInput(event: any, controlName: string) {
    const trimmedValue = event.target.value.replace(/^\s+/, ''); // Remove leading spaces
    this.peacekeepersForm.controls[controlName].setValue(trimmedValue, { emitEvent: false });

    if (this.peacekeepersForm.controls['reference_no'].value) {
      this.isCheckReference = false;
      let sanitized = this.peacekeepersForm.controls['reference_no'].value.toUpperCase().replace(/[^A-Z0-9\-]/g, '');

      // Update the input value and form control
      this.peacekeepersForm.controls['reference_no'].value = sanitized;
      this.peacekeepersForm.controls['reference_no'].setValue(sanitized);
    }
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


  // @HostListener('window:scroll', ['$event'])
  // onScroll() {
  //   const sections = ['pe1', 'pe2', 'pe3', 'pe4', 'pe5'];
  //   let currentSection = '';

  //   for (const section of sections) {
  //     const element = document.getElementById(section);
  //     if (element) {
  //       const rect = element.getBoundingClientRect();
  //       if (rect.top <= 150 && rect.bottom >= 150) {
  //         currentSection = section;
  //         break;
  //       }
  //     }
  //   }

  //   if (currentSection && this.currentSection !== currentSection) {
  //     this.currentSection = currentSection;
  //     this.updateActiveDot();
  //   }
  // }

  updateActiveDot() {
    // Remove active class from all dots
    const dots = document.querySelectorAll('.navbarDots .dot');
    dots.forEach(dot => {
      dot.classList.remove('active');
    });

    // Add active class to current section's dot
    const activeDot = document.querySelector(`.navbarDots .dot[data-scroll="${this.currentSection}"]`);
    if (activeDot) {
      activeDot.classList.add('active');
    }
  }


  async fnValidateCoupon(referalCode: string | any) {
    this.ngxService.start();
    await this.SharedService.getDiscountAmountByCouponCode(referalCode).subscribe({
      next: (response: any) => {
        let decryptData = this.encryptionService.decrypt(response.encryptedData);
        let resDecrypt = JSON.parse(decryptData);

        if (resDecrypt && resDecrypt.success) {

          this.isStrip = resDecrypt.isStripe;

          if (this.isStrip == "false") {

            // This is for Magneti

            this.ngxService.stop();
            resDecrypt.data.forEach((item: any) => {
              if (item.p_type === "PEACEKEEPER") {
                this.peaceKeeperDiscount = item.dollar_aed;
                this.peaceKeeperDescription = item.amount_description;
              }
            });
          }
          else if (this.isStrip == "true") {

            // this is for stripe

            this.ngxService.stop();

            resDecrypt.data.forEach((item: any) => {
              if (item.p_type === "PEACEKEEPER") {
                this.peaceKeeperDiscount = item.discount_amount;
                this.peaceKeeperDescription = item.amount_description;
              }
            });
          }
        }
      },
      error: (error: any) => {
        this.ngxService.stop();
        let decryptErr: any = this.encryptionService.decrypt(error.error.encryptedData);
        decryptErr = JSON.parse(decryptErr);
        console.error('Error :', decryptErr);
        this.SharedService.ToastPopup(decryptErr['error'], '', 'error');
      }
    });
  }
}
