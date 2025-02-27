import { HttpClient } from '@angular/common/http';
import { Component, HostListener, Inject, Renderer2 } from '@angular/core';
import {
  FormGroup,
  Validators,
  FormControlName,
  FormBuilder,
  FormArray,
  AbstractControl,
  ValidatorFn,
} from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { NgxUiLoaderService } from 'ngx-ui-loader';
import { DelegateService } from '../../delegate/services/delegate.service';
import { SharedService } from '../../../../app/shared/services/shared.service';
import {
  CountryISO,
  PhoneNumberFormat,
  SearchCountryField,
} from 'ngx-intl-tel-input';
import { Meta, Title } from '@angular/platform-browser';
import { DOCUMENT } from '@angular/common';

@Component({
  selector: 'app-contact-us',
  templateUrl: './contact-us.component.html',
  styleUrls: ['./contact-us.component.css'],
})
export class ContactUsComponent {
  helpjustice = 'help@justice-love-peace.com';
  code: any;
  contactUsForm: any = FormGroup;
  reqBody: any;
  submitted = false;

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
  selectedCountryISO: any;
  mobile_number: string = '';
  mobile_numberVal: boolean = false;
  isMobileView = false;

  data: any[] = [
    {
      No: 1,
      Country_Name: 'Angola',
      Peacekeeper_Name: 'Alceu Da Silva Moreira',
    },
    { No: 2, Country_Name: 'Argentina', Peacekeeper_Name: 'Juan Cruz' },
    { No: 3, Country_Name: 'Armenia', Peacekeeper_Name: 'Adel Forian' },
    { No: 4, Country_Name: 'Australia', Peacekeeper_Name: 'Leona Tan' },
    { No: 5, Country_Name: 'Bahrain', Peacekeeper_Name: 'Denzil Britto' },
    { No: 6, Country_Name: 'Baluchistan', Peacekeeper_Name: 'Sulaiman Baluch' },
    { No: 7, Country_Name: 'Bangladesh', Peacekeeper_Name: 'Gulam Oyes' },
    { No: 8, Country_Name: 'Botswana', Peacekeeper_Name: 'Mthabisi Bokete' },
    { No: 9, Country_Name: 'Brazil', Peacekeeper_Name: 'Willyan Garcia' },
    { No: 10, Country_Name: 'Cameroon', Peacekeeper_Name: 'Willy Nna' },
    { No: 11, Country_Name: 'Canada', Peacekeeper_Name: 'Eunice Marcia' },
    { No: 12, Country_Name: 'China', Peacekeeper_Name: 'Jen Feng' },
    {
      No: 13,
      Country_Name: 'Colombia',
      Peacekeeper_Name: 'Juan Jacobo Trejos',
    },
    { No: 14, Country_Name: 'DRC', Peacekeeper_Name: 'Israel Ntanga' },
    { No: 15, Country_Name: 'Ecuador', Peacekeeper_Name: 'Manuela Purtschert' },
    { No: 16, Country_Name: 'Egypt', Peacekeeper_Name: 'Anthony Dawood' },
    { No: 17, Country_Name: 'France', Peacekeeper_Name: 'Arnaud Marolleau' },
    { No: 18, Country_Name: 'Germany', Peacekeeper_Name: 'Clinton Khor' },
    { No: 19, Country_Name: 'Guatemala', Peacekeeper_Name: 'Jose Chavez' },
    { No: 20, Country_Name: 'Hungary', Peacekeeper_Name: 'Tamas Szente' },
    { No: 21, Country_Name: 'Iceland', Peacekeeper_Name: 'Magaret Jones' },
    { No: 22, Country_Name: 'India', Peacekeeper_Name: 'Erica Jean' },
    { No: 23, Country_Name: 'Indonesia', Peacekeeper_Name: 'Monica Witanto' },
    { No: 24, Country_Name: 'Israel', Peacekeeper_Name: 'Moran Farhi' },
    { No: 25, Country_Name: 'Italy', Peacekeeper_Name: 'Katiuscia Vaccarini' },
    { No: 26, Country_Name: 'Ivory Coast', Peacekeeper_Name: 'Marie-Laure' },
    {
      No: 27,
      Country_Name: 'Jamaica',
      Peacekeeper_Name: 'Rowdean Kurasch Macharzina',
    },
    { No: 28, Country_Name: 'Japan', Peacekeeper_Name: 'Nupur' },
    { No: 29, Country_Name: 'Kazakhstan', Peacekeeper_Name: 'Mallika' },
    { No: 30, Country_Name: 'Kenya', Peacekeeper_Name: 'Ruth Kimani' },
    { No: 31, Country_Name: 'Kyrgyzstan', Peacekeeper_Name: 'Viktor Pisarev' },
    { No: 32, Country_Name: 'Latvia', Peacekeeper_Name: 'Janis Zvirgzdins' },
    { No: 33, Country_Name: 'Lebanon', Peacekeeper_Name: 'Elissa Hajje' },
    { No: 34, Country_Name: 'Liberia', Peacekeeper_Name: 'J Aaron Wright Sr' },
    {
      No: 35,
      Country_Name: 'Lithuania',
      Peacekeeper_Name: 'Justina Kosinskiene',
    },
    { No: 36, Country_Name: 'Malaysia', Peacekeeper_Name: 'Anitha' },
    {
      No: 37,
      Country_Name: 'Mauritius',
      Peacekeeper_Name: 'Shameemah Sookoor',
    },
    { No: 38, Country_Name: 'Mexico', Peacekeeper_Name: 'Sofia Arellano' },
    { No: 39, Country_Name: 'Morocco', Peacekeeper_Name: 'Yassmine Nacer' },
    {
      No: 40,
      Country_Name: 'Mozambique',
      Peacekeeper_Name: 'Clesia Jamila Paulo',
    },
    { No: 41, Country_Name: 'Namibia', Peacekeeper_Name: 'Dr. Brian Nalisia' },
    { No: 42, Country_Name: 'Nigeria', Peacekeeper_Name: 'Osawaru Henry Agho' },
    { No: 43, Country_Name: 'Oman', Peacekeeper_Name: 'Sagar Akram' },
    {
      No: 44,
      Country_Name: 'Papua New Guinea',
      Peacekeeper_Name: 'Daniel Buburuv',
    },
    { No: 45, Country_Name: 'Peru', Peacekeeper_Name: 'Fiorella Vigo Moran' },
    { No: 46, Country_Name: 'Philippines', Peacekeeper_Name: 'John Usman' },
    { No: 47, Country_Name: 'Poland', Peacekeeper_Name: 'Alseksandra' },
    { No: 48, Country_Name: 'Portugal', Peacekeeper_Name: 'Fillipe' },
    { No: 49, Country_Name: 'Qatar', Peacekeeper_Name: 'Fawad Dadarkar' },
    { No: 50, Country_Name: 'Romania', Peacekeeper_Name: 'Timea Ban' },
    { No: 51, Country_Name: 'Russia', Peacekeeper_Name: 'Natalia Bukharova' },
    {
      No: 52,
      Country_Name: 'Slovakia',
      Peacekeeper_Name: 'Miroslava Spackova',
    },
    { No: 53, Country_Name: 'South Africa', Peacekeeper_Name: 'Alpha Barry' },
    { No: 54, Country_Name: 'Spain', Peacekeeper_Name: 'Elisabeth' },
    {
      No: 55,
      Country_Name: 'Sri Lanka',
      Peacekeeper_Name: 'Inoka Thilakaratne',
    },
    { No: 56, Country_Name: 'Sweden', Peacekeeper_Name: 'Jaya Jankert' },
    {
      No: 57,
      Country_Name: 'Switzerland',
      Peacekeeper_Name: 'Christina Michelle',
    },
    { No: 58, Country_Name: 'The UK', Peacekeeper_Name: 'Catherine Paton' },
    { No: 59, Country_Name: 'Turkey', Peacekeeper_Name: 'Busra' },
    { No: 60, Country_Name: 'USA', Peacekeeper_Name: 'Michelle' },
    { No: 61, Country_Name: 'UAE', Peacekeeper_Name: 'Harshita Godhwani' },
    { No: 62, Country_Name: 'Uganda', Peacekeeper_Name: 'Jamadah' },
    { No: 63, Country_Name: 'Uzbekistan', Peacekeeper_Name: 'Alan' },
    { No: 64, Country_Name: 'Zambia', Peacekeeper_Name: 'Mathews' },
  ];

  changePreferredCountries() {
    this.preferredCountries = [CountryISO.India, CountryISO.Canada];
  }

  constructor(
    private formBuilder: FormBuilder,
    private DelegateService: DelegateService,
    private SharedService: SharedService,
    private ngxService: NgxUiLoaderService,
    private router: Router,
    private httpClient: HttpClient,
    private route: ActivatedRoute,
    private titleService: Title,
        private metaService: Meta,
        private renderer: Renderer2,
        @Inject(DOCUMENT) private document: Document
  ) {}
  getcontrol(name: any): AbstractControl | null {
    return this.contactUsForm.get(name);
  }
  get f() {
    return this.contactUsForm.controls;
  }
  ngOnInit(): void {
    this.setMetaTags();
    this.setCanonicalUrl('https://www.justice-love-peace.com/contact-us');
    // this.getAllCountrycode()
    this.checkWindowSize();

    this.contactUsForm = this.formBuilder.group({
      title: [''],
      firstName: ['', [Validators.required]],
      lastName: ['', [Validators.required]],
      countryCode: [''],
      phoneNumber: ['', [Validators.required, Validators.minLength(10)]],
      email: ['', [Validators.required, Validators.email]], // Using Validators.email for email format validation
      yourQuestion: [''],
    });

    console.log(this.contactUsForm.value, 'contect');
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

  ValidateAlpha(event: any) {
    var keyCode = (event.which) ? event.which : event.keyCode

    if ((keyCode < 65 || keyCode > 90) && (keyCode < 97 || keyCode > 123) && keyCode != 32)
      return false;
    return true;

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

  getAllCountrycode() {
    this.DelegateService.getAllCountrycode().subscribe(
      (res: any) => {
        console.log('code', res.data);
        this.code = res.data;
        // Define the country name you want to find (e.g., "India (+91)")
        const countryToFind = 'India (+91)';

        // Find the object that matches the country name
        const indiaCodeObject = this.code.find(
          (item: any) => item.country_mobile_code === countryToFind
        );
        console.log(indiaCodeObject);

        this.contactUsForm.patchValue({
          countryCode: indiaCodeObject.country_mobile_code,
        });
      },
      (err: any) => {
        console.log('error', err);
      }
    );
  }

  onKeyDown(event: KeyboardEvent, inputValue: any): void {
    // Check if the pressed key is the space bar and the input is empty
    if (event.key === ' ' && event.code === 'Space') {
      event.preventDefault(); // Prevent the space character from being typed
    }
  }

  onMobileKeyDown(event: KeyboardEvent, inputValue: any): void {
    // Check if the pressed key is the space bar and the input is empty
    if (inputValue !== null) {
      if (event.key === ' ' && event.code === 'Space') {
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

  onInput(event: any, controlName: string) {
    const trimmedValue = event.target.value.replace(/^\s+/, ''); // Remove leading spaces
    this.contactUsForm.controls[controlName].setValue(trimmedValue, { emitEvent: false });
  }

 /** ✅ Function to Display Validation Message */
 getPhoneErrorMessage() {
  const control = this.contactUsForm.controls['phoneNumber'];

  if (control.errors.validatePhoneNumber['valid']) {
    return '';
  } else {
    return 'Invalid mobile number for selected country.';
  }
}

  keyPressNumbers(event: KeyboardEvent, inputValue: any) {
    if(inputValue !== null){

      if(inputValue.number.length<7){
        this.mobile_numberVal = true;
        // event.preventDefault()
      } else {
        this.mobile_numberVal = false;
      }
     }
  }


  submitData(): void {
    const rawMobileNumber = this.contactUsForm.value.phoneNumber.number;
    const formattedMobileNumber = rawMobileNumber.replace(/\s+/g, ''); // Removes all spaces
    console.log(formattedMobileNumber);

    this.contactUsForm.patchValue({
      countryCode: this.contactUsForm.value.phoneNumber.countryCode,
      phoneNumber:
        this.contactUsForm.value.phoneNumber.dialCode +
        ' ' +
        formattedMobileNumber,
    });
    console.log(this.contactUsForm);
    this.submitted = true;
    // if (this.contactUsForm.invalid) {
    //   return console.log('Invalid Details');
    // }
    if (this.submitted) {
      this.reqBody = {
        ...this.contactUsForm.value,
      };
      console.log('this.contactUsForm.value', this.contactUsForm.value);
      this.ngxService.start();
      this.SharedService.contectUs(this.reqBody).subscribe(
        (result: any) => {
          if (result.success) {
            console.log('result', result);
            this.ngxService.stop();
            this.contactUsForm.reset();
            this.SharedService.ToastPopup('', result.message, 'success');
          }
        },
        (err) => {
          this.ngxService.stop();

          this.SharedService.ToastPopup('', err.error.message, 'error');
        }
      );
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
  setMetaTags(): void {
    this.titleService.setTitle('Contact Us | Justice, Love, and Peace Movement');

    this.metaService.addTags([
      {
        name: 'description',
        content: "Reach out to the Justice, Love, and Peace Movement for inquiries, support, or collaboration opportunities. Our dedicated team is here to assist you in promoting global harmony and equality."
      },
      {
        property: 'og:title',
        content: 'Contact Us | Justice, Love, and Peace Movement'
      },
      {
        property: 'og:description',
        content: "Reach out to the Justice, Love, and Peace Movement for inquiries, support, or collaboration opportunities. Our dedicated team is here to assist you in promoting global harmony and equality."
      },
      
    ]);
  }
  setCanonicalUrl(url: string): void {
    const existingLink: HTMLLinkElement | null = this.document.querySelector('link[rel="canonical"]');
    if (existingLink) {
      this.renderer.removeChild(this.document.head, existingLink);
    }

    const link: HTMLLinkElement = this.renderer.createElement('link');
    this.renderer.setAttribute(link, 'rel', 'canonical');
    this.renderer.setAttribute(link, 'href', url);
    this.renderer.appendChild(this.document.head, link);
  }
}
