import { Component, OnDestroy, OnInit, Renderer2 } from '@angular/core';
import { WebService } from '../webz-services/web.service';
import { DatePipe } from '@angular/common';
import { NgxUiLoaderService } from 'ngx-ui-loader';
import { ActivatedRoute, Router } from '@angular/router';
import { SharedService } from '../../../../app/shared/services/shared.service';
import { environment } from '../../../../environments/environment';
import { EncryptionService } from '../../../shared/services/encryption.service';

@Component({
  selector: 'app-speakers-profile',
  templateUrl: './speakers-profile.component.html',
  styleUrls: ['./speakers-profile.component.css'],
})
export class SpeakersProfileComponent implements OnInit {
  speakersDetails: any[] = [];
  speakersId: any;
  speakersName: any = '';
  isLoading = true;
  totalColor: any[] = [];
  tinyURL: string = environment.tinyUrl;
  domainUrl: string = environment.domainUrl;
  speakerShareUrl: string = '';

  isCorrectSpeaker: boolean = true;
  constructor(
    private webService: WebService,
    private datePipe: DatePipe,
    private _sharedService: SharedService,
    private ngxService: NgxUiLoaderService,
    private router: Router,
    private route: ActivatedRoute,
    private renderer: Renderer2,
    private encryptionService: EncryptionService,

  ) { }





  ngOnInit(): void {
    this.getrandomcolor(10)
    this.speakerShareUrl = this.domainUrl + this.router.url

    this.route.params.subscribe((params: any) => {
      if (params != undefined && Object.keys(params).length > 0) {
        this.speakersId = params.speakerId
        this.speakersName = params.speakerName
        // if (params['data']) {
        //   let decryptedData = this.encryptionService.decryptData(params['data']);

        //   if (decryptedData) {

        //     this.speakersId = decryptedData.speakerId
        //     this.speakersName = decryptedData.speakerName
        //   }
        // }

      }
    });


    if (this.speakersId) {
      this.loadSpeakers()
    }

  }

  getrandomcolor(length: any) {
    let letters = '0123456789ABCDEF';

    for (let i = 0; i < length; i++) {
      let color = '#';
      for (let j = 0; j < 6; j++) {
        color += letters[Math.floor(Math.random() * 16)];
      }
      this.totalColor.push(color);
    }

  }

  loadSpeakers() {
    this.isLoading = true;
    // Prepare the search text - if country is selected, include it in the search

    this.webService.getSpeakersList('', '100', this.speakersId)
      .subscribe({

        next: (response: any) => {
          if (response?.encryptedData) {
            let decryptedObj: any = this.encryptionService.decrypt(response.encryptedData);
            decryptedObj = JSON.parse(decryptedObj);

            // Decode and clean the name
            let cleanName = decryptedObj?.data[0].speaker_name

            // If the URL is manually modified and does not match the expected format, redirect
            if (this.speakersName !== cleanName) {
              this.isCorrectSpeaker = false; // Redirect user to an error page or home
              return false;
            }
            this.speakersDetails = decryptedObj?.data;
            this.speakersDetails[0].speaker_details = JSON.parse(this.speakersDetails[0].speaker_details)
            this.speakersDetails[0].qr_code = this.speakersDetails[0].url


            // this.speakersDetails[0].speaker_details = this.transformSpeakerData(this.speakersDetails[0].speaker_details);
            // this.speakersDetails[0].speaker_details = [...this.speakersDetails[0].speaker_details];

          } else {
            this.speakersDetails = [];
          }
          this.isLoading = false;
          return; // Explicitly return undefined
        },
        error: (error) => {
          let decryptErr: any = this.encryptionService.decrypt(error.error.encryptedData);
          decryptErr = JSON.parse(decryptErr);
          console.error('Error fetching speakers:', decryptErr);
          this.isLoading = false;
          this.speakersDetails = [];

        },
      });
  }

  private transformSpeakerData(data: any): any[] {
    // Group speakers into chunks of 4 speakers per group
    const groupSize = 2;
    const groups = [];

    for (let i = 0; i < data.length; i += groupSize) {
      groups.push({
        details: data.slice(i, i + groupSize),
      });
    }

    return groups;
  }

  navigateUrl() {
    const tinyUrlWithParams = `${this.speakersDetails[0].url}`;
    // const tinyUrlWithParams = `${'https://tinyurl.com/3322sj49'}`;  //for local testing only
    window.location.href = tinyUrlWithParams;
  }

  copyInputMessage(inputElement: HTMLInputElement) {
    if (inputElement && inputElement.value) {
      navigator.clipboard
        .writeText(inputElement.value)
        .then(() => {
          this._sharedService.ToastPopup('Copied to clipboard!', '', 'success');
        })
        .catch((err) => {
          console.error('Failed to copy: ', err);
        });
    }
  }

  shareContent(): void {
    if (!this.speakerShareUrl) {
      this._sharedService.ToastPopup('QR Code URL is missing.', '', 'error');
      return;
    }

    const shareTitle = `The Global Justice, Love & Peace Summit scheduled on April 12-13, 2025 in Dubai is a star-studded, once-in-a-lifetime experience bringing together world leaders, celebrities, and change-makers to champion justice, unity, and global harmony. Set against the backdrop of Dubai’s visionary landscape, this extraordinary event will feature powerful discussions, inspiring performances, and transformative initiatives aimed at fostering peace, love, and equality  worldwide. Join Us

${this.speakerShareUrl}`;

    const whatsappURL = `https://wa.me/?text=${encodeURIComponent(shareTitle)}`;

    // Check if Web Share API is supported
    if (navigator.share) {
      navigator
        .share({
          text: shareTitle,
        })
        .then(() => console.log('Thanks for sharing!'))
        .catch((err) => {
          if (err.name === 'AbortError') {
            console.warn('User canceled the sharing action.');
          } else {
            console.error('Error while using Web Share API:', err);
          }
        });
    } else {
      // Open WhatsApp in a new tab for users without Web Share API support
      window.open(whatsappURL, '_blank');
    }
  }
  ngOnDestroy(): void { }

  formatCountry(countries: string | string[]): string {
    if (!countries) return ''; // Handle undefined/null cases

    if (typeof countries === 'string') {
      try {
        const parsed = JSON.parse(countries);
        if (Array.isArray(parsed)) {
          return parsed.join(", ");
        }
      } catch (e) {
        return countries; // If parsing fails, return as-is
      }
    }

    if (Array.isArray(countries)) {
      return countries.join(", ");
    }

    return '';
  }
}
