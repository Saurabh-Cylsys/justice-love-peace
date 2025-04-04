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
import { EncryptionService } from '../../../shared/services/encryption.service';
interface Speaker {
  speaker_name: string;
  speaker_country: string;
  speaker_credentials: string;
  profile_photo?: string;
}
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
    currentSection = 'ts1';
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
  isLoading: boolean = true;
  private excludedCountries = ['Morocco', 'France']; // Countries to exclude


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
    private encryptionService: EncryptionService,
    @Inject(DOCUMENT) private document: Document
  ) { }
  ngOnInit(): void {
    this.loadSpeakers();
    this.setMetaTags();
    this.setCanonicalUrl('https://www.justice-love-peace.com/the-summit');


    // this.isMobilespeakersList = this.webService.speakersList;

    // this.speakersList = this.webService.getSpeakersListData();
    // console.log('list', this.speakersList);

    this.checkWindowSize();

    // this.getInviteSpeakers();


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



  loadSpeakers() {
    this.isLoading = true;

    this.webService.getSpeakersList('', '100', 'All')
    .subscribe({
      next: (response: any) => {
        if (response?.encryptedData) {
          // Decrypt the response data
          let encryptedData = response.encryptedData;
          let decryptData = this.encryptionService.decrypt(encryptedData);
          let data = JSON.parse(decryptData);
            // Map the API response data and filter out excluded countries
            const mappedData = data.data
              .filter((item: any) => !this.excludedCountries.includes(item.speaker_country))
              .map((item: any) => ({
                speaker_id: item.speaker_id || '',
                speaker_name: item.speaker_name || '',
                speaker_country: item.speaker_country || '',
                speaker_credentials: item.speaker_credentials || '',
                profile_photo: item.photo_1 || ''
              }));
              this.isMobilespeakersList = mappedData


            // Transform the mapped data into groups
            this.speakersList = this.transformSpeakerData(mappedData);

            // Load countries from the initial data
          

          } else {
            this.speakersList = [];
          }
          this.isLoading = false;
        },
        error: (error) => {
          let decryptErr = this.encryptionService.decrypt(error.error.encryptedData);
          decryptErr = JSON.parse(decryptErr);
          console.error('Error fetching speakers:', decryptErr);
          this.isLoading = false;
          this.speakersList = [];

        }
      });
  }

  private transformSpeakerData(data: Speaker[]): any[] {
    // Group speakers into chunks of 4 speakers per group
    const groupSize = 4;
    const groups = [];

    for (let i = 0; i < data.length; i += groupSize) {
      groups.push({
        speakers: data.slice(i, i + groupSize)
      });
    }

    return groups;
  }

  getInviteSpeakers() {
    this.DelegateService.getSpeakers().subscribe(
      (res: any) => {
        this.speakers = res.data;
      },
      (err: any) => {
        console.log('error', err);
      }
    );
  }
  clickToView(viewToId: any) {
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
  
  
  @HostListener('window:scroll', ['$event'])
  onScroll() {
    const sections = ['ts1', 'ts2', 'ts3', 'ts4', 'ts5', 'ts6', 'ts7', 'ts8', 'ts9'];
    let currentSection = '';
    
    for (const section of sections) {
      const element = document.getElementById(section);
      if (element) {
        const rect = element.getBoundingClientRect();
        if (rect.top <= 150 && rect.bottom >= 150) {
          currentSection = section;
          break;
        }
      }
    }
    
    if (currentSection && this.currentSection !== currentSection) {
      this.currentSection = currentSection;
      this.updateActiveDot();
    }
  }

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

}
