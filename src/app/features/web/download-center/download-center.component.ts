import { DOCUMENT } from '@angular/common';
import { Component, HostListener, Inject, Renderer2 } from '@angular/core';
import { Meta, Title } from '@angular/platform-browser';
import { ActivatedRoute } from '@angular/router';
import { SharedService } from '../../../../app/shared/services/shared.service';
declare var AOS: any;
@Component({
  selector: 'app-download-center',
  templateUrl: './download-center.component.html',
  styleUrls: ['./download-center.component.css'],
})
export class DownloadCenterComponent {
  isMobileView = false;
  constructor(
    private router: ActivatedRoute,
    private SharedService: SharedService,
    private titleService: Title,
    private metaService: Meta,
    private renderer: Renderer2,
    @Inject(DOCUMENT) private document: Document
  ) {}
  ngOnInit(): void {
    this.setMetaTags();
    this.setCanonicalUrl('https://www.justice-love-peace.com/DownloadCenter');
    AOS.init({
      duration: 1200,
    });
    console.log('download center');
    this.checkWindowSize();

    this.router.fragment.subscribe((fragment) => {
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
  setMetaTags(): void {
    this.titleService.setTitle('Download Center | Global Justice, Love, and Peace Summit 2025');

    this.metaService.addTags([
      {
        name: 'description',
        content: "Access essential resources, materials, and documents related to the Justice, Love, and Peace Movement. Download brochures, event details, and more to stay informed and engaged with our global initiatives."
      },
      {
        name: 'title',
        content: "Download Center | Global Justice, Love, and Peace Summit 2025"
      },
      {
        property: 'og:title',
        content: 'Download Center | Global Justice, Love, and Peace Summit 2025'
      },
      {
        property: 'og:description',
        content: "Access essential resources, materials, and documents related to the Justice, Love, and Peace Movement. Download brochures, event details, and more to stay informed and engaged with our global initiatives."
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

  downloadPDF(language: 'English' | 'Mandarin' | 'Hindi' | 'Spain' | 'French' | 'Arabic' | 'Bengali' | 'Portuguese' | 'Russian' | 'Urdu' | 'Indonesian' | 'German') {
    const fileUrls: { [key in 'English' | 'Mandarin' | 'Hindi' | 'Spain'  | 'French' | 'Arabic' | 'Bengali' | 'Portuguese' | 'Russian' | 'Urdu' | 'Indonesian' | 'German']: string } = {
      English: 'assets/UIComponents/files/GJLPS-Brochure-01-ENGLISH-241227.pdf',
      Mandarin: 'assets/UIComponents/files/GJLPS-Brochure-02-MANDARIN.pdf',
      Hindi: 'assets/UIComponents/files/GJLPS-Brochure-03-HINDI-241120.pdf',
      Spain: 'assets/UIComponents/files/GJLPS-Brochure-04-SPANISH.pdf',
      French: 'assets/UIComponents/files/GJLPS-Brochure-05-FRENCH-241212.pdf',
      Arabic: 'assets/UIComponents/files/GJLPS-Brochure-06-ARABIC-241211.pdf',
      Bengali: 'assets/UIComponents/files/GJLPS-Brochure-07-BENGALI-241211.pdf',
      Portuguese: 'assets/UIComponents/files/GJLPS-Brochure-08-PORTUGUESE.pdf',
      Russian: 'assets/UIComponents/files/GJLPS-Brochure-09-RUSSIAN-241205.pdf',
      Urdu: 'assets/UIComponents/files/GJLPS-Brochure-10-URDU-241211.pdf',
      Indonesian: 'assets/UIComponents/files/GJLPS-Brochure-11-INDONESIAN-241213.pdf',
      German: 'assets/UIComponents/files/GJLPS-Brochure-12-GERMAN-241211.pdf',
    };
  
    const fileUrl = fileUrls[language];
    const a = document.createElement('a');
    a.href = fileUrl;
    a.download = `GJLPS-Brochure-${language.toLowerCase()}.pdf`; // Name of the downloaded file
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
  }
  
}
