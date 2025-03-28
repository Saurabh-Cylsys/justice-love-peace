import {
  Component,
  HostListener,
  Inject,
  OnInit,
  Renderer2,
} from '@angular/core';
import {
  FormGroup,
  Validators,
  FormControlName,
  FormBuilder,
  FormArray,
  AbstractControl,
  ValidatorFn,
} from '@angular/forms';
import { NgxUiLoaderService } from 'ngx-ui-loader';
import { SharedService } from '../../../../app/shared/services/shared.service';
import { DelegateService } from '../../delegate/services/delegate.service';
import { ActivatedRoute, NavigationEnd, Router } from '@angular/router';
import { WebService } from '../webz-services/web.service';
import { Meta, Title } from '@angular/platform-browser';
import { DOCUMENT } from '@angular/common';

@Component({
  selector: 'app-the-summit',
  templateUrl: './the-summit.component.html',
  styleUrls: ['./the-summit.component.css'],
})
export class TheSummitComponent implements OnInit {
  isMobileView = false;
  showPopup: boolean = false;
  isSpeaker: string = '';
  display: string = '';
  speakersList: any[] = [];
  isMobilespeakersList: any[] = [];
  visibleCount: number = 5; // Initial number of events to show
  isVisibleCount: boolean = false;
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

  speakers: any;

  constructor(
    private formBuilder: FormBuilder,
    private DelegateService: DelegateService,
    private SharedService: SharedService,
    private ngxService: NgxUiLoaderService,
    private ActivatedRoute: ActivatedRoute,
    private webService: WebService,
    private router: Router,
    private titleService: Title,
    private metaService: Meta,
    private renderer: Renderer2,
    @Inject(DOCUMENT) private document: Document
  ) {}
  ngOnInit(): void {
    this.setMetaTags();
    this.setCanonicalUrl('https://www.justice-love-peace.com/the-summit');
    this.isMobilespeakersList = this.webService.speakersList;

    this.speakersList = this.webService.getSpeakersListData();
    console.log('list', this.speakersList);

    this.checkWindowSize();

    this.getInviteSpeakers();
    this.router.events.subscribe((event) => {
      if (event instanceof NavigationEnd) {
        this.handleFragment();
      }
    });
  }

  showMore(value: boolean) {
    if (value == true) {
      this.isVisibleCount = true;
      this.visibleCount += 6; // Increment the count to show more events
    } else {
      this.isVisibleCount = false;
      this.visibleCount = 5;

      const element = document.getElementById('ts6');
      if (element) {
        element.scrollIntoView({ behavior: 'smooth' });
      }
    }
  }

  getInviteSpeakers() {
    this.DelegateService.getSpeakers().subscribe(
      (res: any) => {
        console.log('speakers', res.data);
        this.speakers = res.data;
      },
      (err: any) => {
        console.log('error', err);
      }
    );
  }
  clickToView(viewToId: any) {
    console.log('id', viewToId);
    this.isSpeaker = viewToId;
    this.display = 'block';
    this.showPopup = true;
  }

  closeModal() {
    this.display = 'none';
    this.showPopup = false;
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

  ngAfterViewInit(): void {
    // Handle fragment on initial load
    this.handleFragment();
  }

  private handleFragment(): void {
    this.ActivatedRoute.fragment.subscribe((fragment) => {
      if (fragment) {
        this.scrollToElement(fragment);
      }
    });
  }

  private scrollToElement(fragment: string): void {
    const element = document.getElementById(fragment);
    if (element) {
      // Ensure smooth scrolling to the target section
      element.scrollIntoView({ behavior: 'smooth', block: 'start' });
    } else {
      // Retry mechanism in case the element is not yet available
      setTimeout(() => {
        this.scrollToElement(fragment);
      }, 100);
    }
  }

  setMetaTags(): void {
    this.titleService.setTitle('The Summit | Global Justice, Love, and Peace Summit 2025');

    this.metaService.addTags([
      {
        name: 'description',
        content: 'Join us at the Global Justice, Love, and Peace Summit 2025 in Dubai. Experience transformative sessions, network with global leaders, and be part of the movement for world peace.'
      },

      {
        name: 'title',
        content: "The Summit | Global Justice, Love, and Peace Summit 2025"
      },
      
      {
        property: 'og:title',
        content: 'The Summit | Global Justice, Love, and Peace Summit 2025'
      },
      {
        property: 'og:description',
        content: 'Join us at the Global Justice, Love, and Peace Summit 2025 in Dubai. Experience transformative sessions, network with global leaders, and be part of the movement for world peace.'
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