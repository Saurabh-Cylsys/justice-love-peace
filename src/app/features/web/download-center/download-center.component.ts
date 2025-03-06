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
}
