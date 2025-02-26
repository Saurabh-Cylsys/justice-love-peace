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
import SwiperCore, { EffectCards, Navigation, Pagination, SwiperOptions, Autoplay } from 'swiper';

// Install Swiper modules
SwiperCore.use([EffectCards, Navigation, Pagination, Autoplay]);
declare var AOS: any;

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
  visibleCount: number = 5; // Initial number of events to show
  isVisibleCount: boolean = false;

  joinOnline: any[] = [
    {
      S_No: 1,
      Name: 'Jose Manuel Ramos Horta, His Excellency',
      Country: 'EAST TIMOR',
      Credentials:
        'President, East Timor & Nobel Peace Laureate, 1996',
    },
    {
      S_No: 2,
      Name: 'Joseph Boakai, His Excellency',
      Country: 'LIBERIA',
      Credentials:
        'President of Liberia',
    },
    {
      S_No: 3,
      Name: 'Sri Sri Ravishankar, Gurudev',
      Country: 'INDIA',
      Credentials:
        'World Spiritual Guru : Founder, Art of Living',
    },
  ];

  swiperConfig: SwiperOptions = {
    effect: "cards",
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



  slides : any = []

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
    @Inject(DOCUMENT) private document: Document
  ) {}

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
    { title: 'Session 4 HAll 1 LOVE  HAll 2 JUSTICE', time: '10:00 AM-12:30 PM' },
    { title: 'Lunch', time: '12:30 PM-1:30 PM' },
    {
      title: 'Session 5 HAll 1 JUSTICE HAll 2 LOVE',
      time: '1:30 PM- 3:30 PM',
    },
    { title: 'Refreshment', time: '3:30 PM - 4:30 PM' },
    { title: 'Session 6 Nobel Peace Laureates Session', time: '4:30 PM- 6:30 PM' },
    { title: 'Awards & Closing Session', time: '7:30 PM-9:00 PM' },
    { title: 'Dinner & Networking', time: '9:00 PM -10:30 PM' },
  ];


   async ngOnInit(): Promise<void> {
   await this.webService.getSpeakers().subscribe((data:any) => {
      this.slides = data;
      this.speakersList = this.webService.confirmedSpeakersList; // Move this inside the subscription
    });
    // fetch('assets/speakers.json')
    //   .then(response => {
    //     if (!response.ok) {
    //       throw new Error('Network response was not ok ' + response.statusText);
    //     }
    //     return response.json();
    //   })
    //   .then(data => {
    //     console.log('JSON data:', data);
    //     this.slides = data; // Use the fetched data in your component
    //   })
    //   .catch(error => {
    //     console.error('There was a problem fetching the JSON file:', error);
    //   });
    // this.setMetaTags();
    // this.setCanonicalUrl('https://www.justice-love-peace.com/home');
    this.checkWindowSize();
    AOS.init({
      duration: 1200,
    });

    console.log('home');
    this.SharedService.headerIcon = this._router.routerState.snapshot.url;

    this.updateCountdown();
    this.timerInterval = setInterval(() => {
      this.updateCountdown();
    }, 1000);
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
      const response = await fetch("assets/speakers.json");
      const speakers = await response.json();

      // Cache the data
      localStorage.setItem(this.SPEAKERS_CACHE_KEY, JSON.stringify({
        timestamp: Date.now(),
        data: speakers
      }));

      return speakers;
    } catch (error) {
      console.error("Error fetching speakers:", error);
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

  // setMetaTags(): void {

  //   this.titleService.setTitle('Global Justice, Love and Peace Summit | Dubai');


  //   this.metaService.addTags([
  //     {
  //       name: 'description',
  //       content:
  //         'Join the Global Justice, Love, and Peace Summit in Dubai, a transformative event uniting leaders, activists, and visionaries to promote equality, compassion, and harmony worldwide. Be part of the change!',
  //     },
  //     {
  //       name: 'keywords',
  //       content: 'Become a peacekeeper, Dubai Peace Summit 2025, Global Justice Summit Dubai, Global peace efforts, Global Peace Summit Dubai 2025, Join the peace movement, Justice and equality events, Love and Peace Summit, Peace summit registration, Promoting equality and compassion, Register for the summit, Social harmony projects, World peace movement, World Peacekeepers Summit'
  //     },
  //     {
  //       property: 'og:title',
  //       content: 'Global Justice, Love and Peace Summit | Dubai',
  //     },
  //     {
  //       property: 'og:description',
  //       content:
  //         'Join the Global Justice, Love, and Peace Summit in Dubai, a transformative event uniting leaders, activists, and visionaries to promote equality, compassion, and harmony worldwide. Be part of the change!',
  //     },
  //     {
  //       property: 'og:image',
  //       content:
  //         'http://www.justice-love-peace.com/assets/UIComponents/images/logo.jpg',
  //     },
  //     {
  //       property: 'og:url',
  //       content: 'https://www.justice-love-peace.com/home',
  //     },
  //     {
  //       property: 'og:type',
  //       content: 'website',
  //     },
  //     {
  //       property: 'og:site_name',
  //       content: 'Global Justice, Love and Peace Summit | Dubai',
  //     },
  //   ]);
  // }

  // setCanonicalUrl(url: string): void {

  //   const existingLink: HTMLLinkElement | null = this.document.querySelector('link[rel="canonical"]');
  //   if (existingLink) {
  //     this.renderer.removeChild(this.document.head, existingLink);
  //   }


  //   const link: HTMLLinkElement = this.renderer.createElement('link');
  //   this.renderer.setAttribute(link, 'rel', 'canonical');
  //   this.renderer.setAttribute(link, 'href', url);
  //   this.renderer.appendChild(this.document.head, link);
  // }
}
