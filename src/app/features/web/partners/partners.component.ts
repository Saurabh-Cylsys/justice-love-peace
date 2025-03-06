import { Component, HostListener, Inject, Renderer2 } from '@angular/core';
import { SharedService } from '../../../../app/shared/services/shared.service';
import { ActivatedRoute, Router } from '@angular/router';
import { Meta, Title } from '@angular/platform-browser';
import { DOCUMENT } from '@angular/common';

@Component({
  selector: 'app-partners',
  templateUrl: './partners.component.html',
  styleUrls: ['./partners.component.css'],
})
export class PartnersComponent {
  isMobileView = false;
  // headerIcon:any
  constructor(
    private SharedService: SharedService,
    private ActivatedRoute: ActivatedRoute,
    private titleService: Title,
    private metaService: Meta,
    private renderer: Renderer2,
    @Inject(DOCUMENT) private document: Document
  ) {}

  ngOnInit(): void {
    this.setMetaTags();
    this.setCanonicalUrl('https://www.justice-love-peace.com/partners');
    this.checkWindowSize();
    
    this.ActivatedRoute.fragment.subscribe((fragment) => {
      if (fragment) {
        const element = document.getElementById(fragment);
        if (element) {
          element.scrollIntoView({ behavior: 'smooth' });
        }
      }
    });
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


  setMetaTags(): void {
    this.titleService.setTitle('Our Partners | Global Justice, Love, and Peace Movement | Dubai');

    this.metaService.addTags([
      {
        name: 'description',
        content: "Meet the organizations and individuals collaborating with the Justice, Love, and Peace Movement to promote global harmony and equality. Discover our partners' contributions and join us in fostering a more peaceful world."
      },
      {
        name: 'title',
        content: "Our Partners | Global Justice, Love, and Peace Movement | Dubai"
      },
      {
        property: 'og:title',
        content: 'Our Partners | Global Justice, Love, and Peace Movement | Dubai'
      },
      {
        property: 'og:description',
        content: "Meet the organizations and individuals collaborating with the Justice, Love, and Peace Movement to promote global harmony and equality. Discover our partners' contributions and join us in fostering a more peaceful world."
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
