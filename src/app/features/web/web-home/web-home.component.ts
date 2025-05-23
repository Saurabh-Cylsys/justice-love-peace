import {
  ChangeDetectorRef,
  Component,
  HostListener,
  Inject,
  OnDestroy,
  OnInit,
  Renderer2,
} from '@angular/core';

import { ActivatedRoute, Router } from '@angular/router';
import { SharedService } from '../../../../app/shared/services/shared.service';
import { WebService } from '../webz-services/web.service';
import { Meta, Title } from '@angular/platform-browser';
import { DOCUMENT } from '@angular/common';
import SwiperCore, {
  EffectCards,
  Navigation,
  Pagination,
  SwiperOptions,
  Autoplay,
} from 'swiper';
import { de } from 'intl-tel-input/i18n';
import { EncryptionService } from '../../../shared/services/encryption.service';
import { DomSanitizer } from '@angular/platform-browser';

// Install Swiper modules
SwiperCore.use([EffectCards, Navigation, Pagination, Autoplay]);
// declare var AOS: any;

@Component({
  selector: 'app-web-home',
  templateUrl: './web-home.component.html',
  styleUrls: ['./web-home.component.css'],
})
export class WebHomeComponent implements OnInit, OnDestroy {
  targetDate: Date = new Date('2025-04-12T09:00:00'); // Replace with your target date
  days: number = 0;
  hours: number = 0;
  minutes: number = 0;
  private timerInterval: any;
  isMobileView = false;
  speakersList: any[] = [];
  inPersonSpeakers: any[] = [];
  onlineSpeakers: any[] = [];
  visibleCount: number = 5; // Initial number of events to show
  isVisibleCount: boolean = false;

  joinOnline: any[] = [
    {
      Name: 'Jose Manuel Ramos Horta, His Excellency',
      Country: 'EAST TIMOR',
      Credentials: 'President, East Timor & Nobel Peace Laureate, 1996',
    },
    {
      Name: 'Joseph Boakai, His Excellency',
      Country: 'LIBERIA',
      Credentials: 'President of Liberia',
    },
    {
      Name: 'Mata Amritanandamayi',
      Country: 'INDIA',
      Credentials: 'Chancellor of Amrita Vishwa Vidyapeetham',
    },
    {
      Name: 'Sri Sri Ravishankar, Gurudev',
      Country: 'INDIA',
      Credentials: 'World Spiritual Guru : Founder, Art of Living',
    },
  ];

  swiperConfig: SwiperOptions = {
    effect: 'cards',
    grabCursor: true,
    initialSlide: 2,
    speed: 500,
    loop: true,
    mousewheel: {
      invert: false,
    },
    autoplay: {
      delay: 3000, // Time (in milliseconds) between transitions
      disableOnInteraction: false, // Continue autoplay even after user interaction
    },
  };

  private excludedCountries = ['Morocco', 'France']; // Countries to exclude

  slides: any = [];
  liveStreamingUrl: any;
  // headerIcon:any
  constructor(
    private _router: Router,
    private _activeRouter: ActivatedRoute,
    private SharedService: SharedService,
    private cdr: ChangeDetectorRef,
    private webService: WebService,
    private titleService: Title,
    private metaService: Meta,
    private renderer: Renderer2,
    private encryptionService: EncryptionService,
    private sanitizer: DomSanitizer,

    @Inject(DOCUMENT) private document: Document
  ) {

    // this.getLiveStream();

    // this.liveStreamingUrl = this.sanitizer.bypassSecurityTrustResourceUrl(
    //   'https://www.youtube.com/embed/3SViIOqesmg'
    // );

  }

  events_day1 = [
    { title: 'Registration / Refreshment', time: '8:00 AM-10:00 AM' },
    { title: 'Opening Session', time: '10:00 AM-10:30 AM' },
    {
      title: 'Session 1 HAll 1 JUSTICE HAll 2 PEACE',
      time: '10:30 AM-1:00 PM',
    },
    { title: 'Lunch & Networking', time: '1:00 PM-2:00 PM' },
    { title: 'Session 2 HAll 1 lOVE HAll 2 JUSTICE', time: '2:00 PM-4:30 PM' },
    { title: 'Tea & Networking', time: '4:30 PM-5:00 PM' },
    { title: 'Session 3 HAll 1 PEACE HAll 2 LOVE', time: '5:00 PM-7:30 PM' },
    { title: 'Dinner & Networking', time: '7:30 PM-9:30 PM' },
  ];
  events_day2 = [
    {
      title: 'Session 4 HAll 1 LOVE  HAll 2 JUSTICE',
      time: '10:00 AM-12:30 PM',
    },
    { title: 'Lunch', time: '12:30 PM-1:30 PM' },
    {
      title: 'Session 5 HAll 1 JUSTICE HAll 2 LOVE',
      time: '1:30 PM- 3:30 PM',
    },
    { title: 'Refreshment', time: '3:30 PM - 4:30 PM' },
    {
      title: 'Session 6 Nobel Peace Laureates Session',
      time: '4:30 PM- 6:30 PM',
    },
    { title: 'Awards & Closing Session', time: '7:30 PM-9:00 PM' },
    { title: 'Dinner & Networking', time: '9:00 PM -10:30 PM' },
  ];

  ngOnInit(): void {
    const unsafeUrl = "https://www.youtube.com/embed/o62k1_sTKTk?autoplay=1&mute=0";
    this.liveStreamingUrl = this.sanitizer.bypassSecurityTrustResourceUrl(unsafeUrl);
    this.setMetaTags();
    this.setCanonicalUrl('https://www.justice-love-peace.com');
    this.checkWindowSize();
    this.SharedService.headerIcon = this._router.routerState.snapshot.url;
    this.loadSpeakers();
    this.updateCountdown();
    this.timerInterval = setInterval(() => {
      this.updateCountdown();
    }, 1000);
    // Move speakers data fetch to after initial page render
    setTimeout(async () => {
      await this.webService.getSpeakersCards().subscribe((data: any) => {
        if (data?.encryptedData) {
          // Decrypt the response data
          let decryptData = this.encryptionService.decrypt(data.encryptedData);
          let decryptedData = JSON.parse(decryptData);

          this.slides = decryptedData;
          // this.loadSpeakers();
          this.cdr.detectChanges();
        }
      });
    }, 0);

  }

  SPEAKERS_CACHE_KEY = 'speakers_cache_v1';
  CACHE_EXPIRATION = 24 * 60 * 60 * 1000; // 24 hours

  async fetchSpeakersWithCaching() {
    const cachedData = localStorage.getItem(this.SPEAKERS_CACHE_KEY);

    if (cachedData) {
      const { timestamp, data } = JSON.parse(cachedData);

      // Check if cache is still valid
      if (Date.now() - timestamp < this.CACHE_EXPIRATION) {
        return data;
      }
    }

    try {
      const response = await fetch('assets/speakers.json');
      const speakers = await response.json();

      // Cache the data
      localStorage.setItem(
        this.SPEAKERS_CACHE_KEY,
        JSON.stringify({
          timestamp: Date.now(),
          data: speakers,
        })
      );

      return speakers;
    } catch (error) {
      console.error('Error fetching speakers:', error);
      return [];
    }
  }

  ngOnDestroy(): void {
    if (this.timerInterval) {
      clearInterval(this.timerInterval);
    }
  }

  showMore(value: boolean) {
    if (value == true) {
      this.isVisibleCount = true;
      this.visibleCount += 6; // Increment the count to show more events
    } else {
      this.isVisibleCount = false;
      this.visibleCount = 5;

      const element = document.getElementById('event1');
      if (element) {
        element.scrollIntoView({ behavior: 'smooth' });
      }
    }
  }

  toggle() {
    this._router.navigateByUrl('/aboutUs');
  }

  downloadPDF() {
    const fileUrl = 'assets/UIComponents/files/GJLPS-Collateral-Brochure.pdf'; // Path to your PDF file in the assets folder
    const a = document.createElement('a');
    a.href = fileUrl;
    a.download = 'GJLPS-Collateral-Brochure.pdf'; // Name of the downloaded file
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
  }

  navigate() {
    console.log('del');

    this._router.navigate(['/delegate-registration']);

    // this._router.navigate[('/delegate-registration')];
  }

  checkWindowSize(): void {
    if (window.innerWidth <= 900) {
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

  private updateCountdown(): void {
    const now = new Date().getTime();

    // Adjust current time to Dubai UTC-1.5
    const dubaiTimeOffset = 1.5 * 60 * 60 * 1000; // Dubai is UTC-1.5
    const dubaiNow = now - dubaiTimeOffset;

    const targetDate = this.targetDate.getTime();
    const timeDifference = targetDate - dubaiNow;

    // const now = new Date().getTime();

    // const targetDate = this.targetDate.getTime();
    // const timeDifference = targetDate - now;

    if (timeDifference > 0) {
      this.days = Math.floor(timeDifference / (1000 * 60 * 60 * 24));
      this.hours = Math.floor(
        (timeDifference % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60)
      );
      this.minutes = Math.floor(
        (timeDifference % (1000 * 60 * 60)) / (1000 * 60)
      );
    } else {
      this.days = this.hours = this.minutes = 0;
    }

    // console.log('Countdown:', { days: this.days, hours: this.hours, minutes: this.minutes });
    this.cdr.detectChanges();
  }

  setMetaTags(): void {
    this.titleService.setTitle('Global Justice, Love and Peace Summit | Dubai');

    this.metaService.addTags([
      {
        name: 'description',
        content:
          'Join the Global Justice, Love, and Peace Summit in Dubai, a transformative event uniting leaders, activists, and visionaries to promote equality, compassion, and harmony worldwide. Be part of the change!',
      },
      {
        name: 'title',
        content: 'Global Justice, Love and Peace Summit | Dubai',
      },
      {
        property: 'og:title',
        content: 'Global Justice, Love and Peace Summit | Dubai',
      },
      {
        property: 'og:description',
        content:
          'Join the Global Justice, Love, and Peace Summit in Dubai, a transformative event uniting leaders, activists, and visionaries to promote equality, compassion, and harmony worldwide. Be part of the change!',
      },
    ]);
  }

  setCanonicalUrl(url: string): void {
    const existingLink: HTMLLinkElement | null = this.document.querySelector(
      'link[rel="canonical"]'
    );
    if (existingLink) {
      this.renderer.removeChild(this.document.head, existingLink);
    }

    const link: HTMLLinkElement = this.renderer.createElement('link');
    this.renderer.setAttribute(link, 'rel', 'canonical');
    this.renderer.setAttribute(link, 'href', url);
    this.renderer.appendChild(this.document.head, link);
  }

 
  loadSpeakers() {
    this.webService.getSpeakersList('', '100', 'All')
      .subscribe({
        next: (response: any) => {
          if (response?.encryptedData) {
            // Decrypt the response data
            let encryptedData = response.encryptedData;
            let decryptData = this.encryptionService.decrypt(encryptedData);
            let data = JSON.parse(decryptData);

            console.log('speakers data:', data);
              // Map the API response data and filter out excluded countries

               // List of titles to ignore in sorting
              //  const titlesToIgnore = [
              //   'Dr.',
              //   'General',
              //   'Gertraud Thekla',
              //   'MaharajKumar',
              //   'Nawabzada',
              //   'Pujya',
              //   'Bhai Sahib',
              //   'Swami',
              //   'Excellency Dr.',
              //   'Father, Dr.',
              //   'Father, Dr.',
              //   'Father,Dr.',
              //   'His Excellency, Judge',
              //   'His Excellency, Judge',
              //   'Imam ,',
              //   'Prof, Deshmanya'
              // ];

              const titlesToIgnore = [
                'Dr.',
                'General',
                'Gertraud Thekla',
                'MaharajKumar',
                'Nawabzada',
                'Pujya',
                'Bhai Sahib',
                'Swami',
                'Excellency Dr.',
                'Father, Dr.',
                'Father,Dr.',
                'Father, Dr.', // Add all variants if spacing is inconsistent
                'His Excellency, Judge',
                'Imam ,',
                'Prof. Deshmanya,'
              ];

              const escapeRegex = (str: string) =>
                str.replace(/[.*+?^${}()|[\]\\]/g, '\\$&');

              const cleanSpeakerName = (name: string): string => {
                for (const title of titlesToIgnore) {
                  const escapedTitle = escapeRegex(title.trim());
                  const regex = new RegExp('^' + escapedTitle + '\\s*', 'i');
                  if (regex.test(name)) {
                    return name.replace(regex, '').trim().toLowerCase();
                  }
                }
                return name.toLowerCase();
              };

              // Function to clean title from the beginning if it matches the ignore list
                // const cleanSpeakerName = (name: string): string => {
                //   for (const title of titlesToIgnore) {
                //     const regex = new RegExp('^' + title + '\\s+', 'i');
                //     if (regex.test(name)) {
                //       return name.replace(regex, '').trim().toLowerCase();
                //     }
                //   }
                //   return name.toLowerCase();
                // };

              const mappedData = data.data
              .filter((item: any) => !this.excludedCountries.includes(item.speaker_country))
              .map((item: any) => ({
                speaker_id: item.speaker_id || '',
                speaker_name: item.speaker_name || '',
                speaker_country: item.speaker_country || '',
                speaker_credentials: item.speaker_credentials || '',
                profile_photo: item.photo_1 || '',
                is_online: item.is_online
              }))

              .sort((a: any, b: any) => {
                const nameA = cleanSpeakerName(a.speaker_name);
                const nameB = cleanSpeakerName(b.speaker_name);
                return nameA.localeCompare(nameB);
              });

            // Transform the mapped data into groups
            this.speakersList = mappedData;
            this.inPersonSpeakers = this.speakersList.filter(speaker => speaker.is_online === 0);
            this.onlineSpeakers = this.speakersList.filter(speaker => speaker.is_online === 1);
            // Load countries from the initial data

          } else {
            this.speakersList = [];
          }
        },
        error: (error) => {
          let decryptErr = this.encryptionService.decrypt(error.error.encryptedData);
          decryptErr = JSON.parse(decryptErr);
          console.error('Error fetching speakers:', decryptErr);
          this.speakersList = [];
        }
      });
  }

  getLiveStream() {
    let body = {
      parent_code: "LIVE",
      type: "CHILD"
    }
    this.webService.getLiveStream(body).subscribe({
      next: (response: any) => {
        this.liveStreamingUrl = this.sanitizer.bypassSecurityTrustResourceUrl(response[0]['lookup_code']

        );
        console.log(this.liveStreamingUrl, '  this.liveStreamingUrl');
      }
    })

  }
  formatCountry(countries: string | string[]): string {
    if (!countries) return ''; // Handle undefined/null cases

    if (typeof countries === 'string') {
      try {
        const parsed = JSON.parse(countries);
        if (Array.isArray(parsed)) {
          return parsed.join(', ');
        }
      } catch (e) {
        return countries; // If parsing fails, return as-is
      }
    }

    if (Array.isArray(countries)) {
      return countries.join(', ');
    }

    return '';
  }

  openPdf(filePath: string, fileName: string, fileType: string) {
    switch (fileType) {
      case 'PEACE_IMG':
        filePath = 'assets/UIComponents/images/' + fileName;
        break;

      case 'PEACE_PDF':
        filePath = 'assets/UIComponents/files/' + fileName;
        break;
    }
    window.open(filePath, '_blank');
  }
}
