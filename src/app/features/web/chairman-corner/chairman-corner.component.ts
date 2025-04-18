import { DOCUMENT } from '@angular/common';
import { Component, HostListener, Inject, Renderer2 } from '@angular/core';
import { Meta, Title } from '@angular/platform-browser';
import { ActivatedRoute, Router } from '@angular/router';
import { SharedService } from '../../../../app/shared/services/shared.service';

@Component({
  selector: 'app-chairman-corner',
  templateUrl: './chairman-corner.component.html',
  styleUrls: ['./chairman-corner.component.css'],
})
export class ChairmanCornerComponent {
  isMobileView = false;
  constructor(
    private router: ActivatedRoute,
    public _router: Router,
    private SharedService: SharedService,
    private titleService: Title,
      private metaService: Meta,
      private renderer: Renderer2,
      @Inject(DOCUMENT) private document: Document
  ) {}

  ngOnInit(): void {
    this.checkWindowSize();
    this.setMetaTags();
      this.setCanonicalUrl('https://www.justice-love-peace.com/chairman-corner');

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
    this.titleService.setTitle('Chairmans Corner | Global Justice, Love, and Peace Summit 2025');

    this.metaService.addTags([
      {
        name: 'description',
        content: "Explore insights and messages from the Chairman of the Justice, Love, and Peace Movement, guiding our mission to foster global harmony and equality. Stay informed about leadership perspectives and organizational developments."
      },
      {
        name: 'title',
        content: "Chairmans Corner | Global Justice, Love, and Peace Summit 2025"
      },
      {
        property: 'og:title',
        content: 'Chairmans Corner | Global Justice, Love, and Peace Summit 2025'
      },
      {
        property: 'og:description',
        content: "Explore insights and messages from the Chairman of the Justice, Love, and Peace Movement, guiding our mission to foster global harmony and equality. Stay informed about leadership perspectives and organizational developments."
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
