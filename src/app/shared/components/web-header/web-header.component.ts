import { Component, ElementRef, HostListener, OnInit, Renderer2, ViewChild } from '@angular/core';
import { ActivatedRoute, NavigationEnd, Router } from '@angular/router';
import { filter } from 'rxjs';
import { SharedService } from '../../../../app/shared/services/shared.service';
import { Location } from '@angular/common';
import { environment } from '../../../../environments/environment';

@Component({
  selector: 'app-web-header',
  templateUrl: './web-header.component.html',
  styleUrls: ['./web-header.component.css'],
})
export class WebHeaderComponent implements OnInit {
  headerIcon: any;
  isHomePage: boolean = false;
  isMobileView = false;
  ReferenceCode: any = '';
  tinyURL : string = environment.tinyUrl;

  summitLinks = [
    { label: 'Highlights of Summit', fragment: undefined },
    { label: 'Chairman', fragment: 'ts2' },
    { label: 'Speakers (Peace Ambassadors)', fragment: 'ts3' },
    { label: 'Delegates', fragment: 'ts4' },
    { label: 'Goals of Summit', fragment: 'ts5' },
    { label: 'Agenda', fragment: 'ts6' },
    { label: 'Themes', fragment: 'ts7' },
    { label: 'Structured Networking', fragment: 'ts8' },
    { label: 'Venue', fragment: 'ts9' },
  ];
  partnersLinks = [
    { label: 'Corporate Partners', fragment: undefined },
    { label: 'Causes we Support', fragment: 'p3' },
    { label: 'Event, Media & PR Agency', fragment: 'p4' },
    { label: 'Service Partners', fragment: 'p5' },
  ];
  awardsLinks = [
    { label: 'Award Categories', fragment: undefined },
    { label: 'Nominees', fragment: 'aw2' },
    { label: 'Awards Research Committee', fragment: 'aw3' },
  ];
  peacekeeperLinks = [
    { label: 'The Movement', fragment: undefined },
    { label: 'I am Peacekeeper', fragment: 'pe2' },
    { label: 'Sign Up Now', fragment: 'pe3' },
    { label: '7 Human Values', fragment: 'pe4' },
    { label: 'Song and Graphics', fragment: 'pe5' },
  ];
  downloadLinks = [
    { label: 'Mission & Pledge', fragment: undefined },
    { label: 'The Summit of 28', fragment: 'dc2' },
    { label: 'The Number 28', fragment: 'dc3' },
    { label: '7 Pillars of Justice', fragment: 'dc4' },
    { label: '7 Causes of World Conflict', fragment: 'dc5' },
    { label: '7 Quotes of Inner Peace', fragment: 'dc6' },
    { label: '28 Gems of World Peace', fragment: 'dc7' },
    { label: 'We are One', fragment: 'dc8' },
    { label: 'Chairs for Delegates', fragment: 'dc9' },
    { label: '28 Poems', fragment: 'dc10' },
    { label: '28 Sayings', fragment: 'dc11' },
  ];
  chairmanLinks = [
    { label: 'Videos', fragment: undefined },
    { label: 'Messages', fragment: 'cc2' },
    { label: 'Songs', fragment: 'cc3' },
  ];

  isScrolled = false;

  @HostListener('window:scroll', [])
  onWindowScroll() {
    const scrollY = window.scrollY;
    this.isScrolled = scrollY > 50; // Change logo size after 50px of scroll
  }
  constructor(
    public _router: Router,
    private _activeRouter: ActivatedRoute,
    private SharedService: SharedService,
    private location: Location,
    private renderer: Renderer2
  ) {}
  ngOnInit(): void {
    this.checkWindowSize();
    this.headerIcon = this.SharedService.headerIcon;
    console.log(this.headerIcon, 'hhhhhh');
    console.log(this._activeRouter.url, 'WebHeaderComponent initialized');

    this._router.events.subscribe(() => {
      this.isHomePage = this._router.url === '/'; // Check if the route is home
    });

    this._activeRouter.fragment.subscribe((fragment) => {
      if (fragment) {
        const element = document.getElementById(fragment);
        if (element) {
          element.scrollIntoView({ behavior: 'smooth' });
        }
      }
    });
  }

  navigateUrl() {
    // this._router.navigate(['/delegate-registration'],{ queryParams: { code: this.ReferenceCode }});
    // this._router.navigate(['/delegate-registration']);

    // this._router.navigate(['/delegate-registration'], {
    //   queryParams: { medium :1 }
    // });

    const tinyUrlWithParams = `${this.tinyURL}`;

    // const tinyUrlWithParams = `${'https://tinyurl.com/3322sj49'}`;  //for local testing only

        window.location.href = tinyUrlWithParams;

    // this._router.navigate(['/peacekeeper-preselect'], {
    //   queryParams: { medium :1 },
    // });
  }


  scrollById(route:any,id:any){
    this._router.navigate([route],{ queryParams: { id: id }});

  }
  downloadPDF() {
    const fileUrl = 'assets/UIComponents/files/GJLPS-Brochure-01-ENGLISH-241227.pdf'; // Path to your PDF file in the assets folder
    const a = document.createElement('a');
    a.href = fileUrl;
    a.download = 'GJLPS-Brochure-english.pdf'; // Name of the downloaded file
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
  }

  displayMyDIV: boolean = false; // Initialize the visibility property

  // toggleVisibility() {
  //   this.displayMyDIV = !this.displayMyDIV;

  //   // Get the arrow element by ID
  //   const arrowElement = document.getElementById('arrow-icon');
  //   if (arrowElement) {
  //     if (this.displayMyDIV) {
  //       arrowElement.classList.remove('arrow-down');
  //       arrowElement.classList.add('arrow-up');
  //     } else {
  //       arrowElement.classList.remove('arrow-up');
  //       arrowElement.classList.add('arrow-down');

  //     }
  //   }
  //   }
  toggleVisibility() {
    const myDIV = document.getElementById('myDIV');
    const arrowElement = document.getElementById('arrow-icon');

    if (myDIV && arrowElement) {
      if (!this.displayMyDIV) {
        // Open with a transition
        myDIV.style.maxHeight = '500px';
        arrowElement.classList.remove('arrow-down');
        arrowElement.classList.add('arrow-up');
      } else {
        // Close with the same transition
        myDIV.style.maxHeight = '0';
        arrowElement.classList.remove('arrow-up');
        arrowElement.classList.add('arrow-down');
        // Add a timeout to remove the 'open' class after the transition completes
        setTimeout(() => {
          myDIV.classList.remove('open');
        }, 1000); // Adjust this value to match your transition duration (3 seconds in this case)
      }
    }

    this.displayMyDIV = !this.displayMyDIV;
  }

  display = false;
  abhi() {
    this.display = !this.display;
  }

  // refreshPage() {
  //   this._router.navigate(['/home']).then(() => {
  //     console.log("test");
  //     location.reload();
  //   });
  // }

  refreshPage(route: string,fragment: string | undefined) {
    switch (route) {
      case 'summit':
        this._router.navigate(['/the-summit'],{ fragment }).then(() => {
          console.log("Navigated to 'home'");
          location.reload();
        });
        break;
      case 'awards':
        this._router.navigate(['/awards']).then(() => {
          console.log("Navigated to 'awards'");
          location.reload();
        });
        break;
      case 'OurLengcy':
        this._router.navigate(['/OurLengcy']).then(() => {
          console.log("Navigated to 'OurLengcy'");
          location.reload();
        });
        break;
      case 'JoinOurmailingList':
        this._router.navigate(['/JoinOurmailingList']).then(() => {
          console.log("Navigated to 'JoinOurmailingList'");
          location.reload();
        });
        break;
      case 'Photos':
        this._router.navigate(['/Photos']).then(() => {
          console.log("Navigated to 'Photos'");
          location.reload();
        });
        break;
      case 'speaker-registration':
        this._router.navigate(['/speaker-registration']).then(() => {
          console.log("Navigated to 'speaker-registration'");
          location.reload();
        });
        break;
      case 'speaker':
        this._router.navigate(['/speaker']).then(() => {
          console.log("Navigated to 'speaker'");
          location.reload();
        });
        break;
      case 'pastspeakers':
        this._router.navigate(['/pastspeakers']).then(() => {
          console.log("Navigated to 'pastspeakers'");
          location.reload();
        });
        break;
      case 'agenda':
        this._router.navigate(['/agenda']).then(() => {
          console.log("Navigated to 'agenda'");
          location.reload();
        });
        break;
      case 'WhoShouldAttend':
        this._router.navigate(['/WhoShouldAttend']).then(() => {
          console.log("Navigated to 'WhoShouldAttend'");
          location.reload();
        });
        break;

      case 'EventPartners':
        this._router.navigate(['/EventPartners']).then(() => {
          console.log("Navigated to 'EventPartners'");
          location.reload();
        });
        break;

      case 'MediaPartners':
        this._router.navigate(['/MediaPartners']).then(() => {
          console.log("Navigated to 'MediaPartners'");
          location.reload();
        });
        break;

      case 'DownloadCenter':
        this._router.navigate(['/DownloadCenter']).then(() => {
          console.log("Navigated to 'DownloadCenter'");
          location.reload();
        });
        break;
      // Add more cases for other routes as needed
    }
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


  navigateToSection(fragment: string | undefined) {
    const offcanvasElement = document.getElementById('offcanvasScrolling');

  if (offcanvasElement) {
    offcanvasElement.classList.remove('show'); // Remove the "show" class
  }
    if (fragment) {
      setTimeout(() => {
        this.location.replaceState(this._router.url.split('#')[0]); // Remove fragment
      }, 1000); // Delay to allow scrolling
    } else {
      // Ensure we remove the trailing #
      setTimeout(() => {
        this.location.replaceState(this._router.url.split('#')[0]);
      }, 100);
    }
  }
}
