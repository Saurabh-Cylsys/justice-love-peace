import { DOCUMENT } from '@angular/common';
import { Component, HostListener, Inject, Renderer2 } from '@angular/core';
import { Meta, Title } from '@angular/platform-browser';
import { ActivatedRoute } from '@angular/router';
import { SharedService } from '../../../../app/shared/services/shared.service';

@Component({
  selector: 'app-awards',
  templateUrl: './awards.component.html',
  styleUrls: ['./awards.component.css'],
})
export class AwardsComponent {
  isMobileView = false;
  constructor(
    private _activeRouter: ActivatedRoute,
    private SharedService: SharedService,
    private titleService: Title,
        private metaService: Meta,
        private renderer: Renderer2,
        @Inject(DOCUMENT) private document: Document
  ) {}

  ngOnInit(): void {
    // this.setMetaTags();
    // this.setCanonicalUrl('https://www.justice-love-peace.com/awards');
    this.checkWindowSize();
    this._activeRouter.fragment.subscribe((fragment) => {
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
  // setMetaTags(): void {
    
  //   this.titleService.setTitle('Awards | Global Justice, Love, and Peace Movement | Dubai');

    
  //   this.metaService.addTags([
  //     {
  //       name: 'description',
  //       content:
  //         'Explore the prestigious awards conferred by the Justice, Love, and Peace Movement through a non-biased, merit-based process conducted by a 28-member global committee across 23 countries. Honoring individuals from all professions who have made a significant impact on society.',
  //     },
  //     {
  //       name: 'keywords',
  //       content: 'Become a peacekeeper, Dubai Peace Summit 2025, Global Justice Summit Dubai, Global peace efforts, Global Peace Summit Dubai 2025, Join the peace movement, Justice and equality events, Love and Peace Summit, Peace summit registration, Promoting equality and compassion, Register for the summit, Social harmony projects, World peace movement, World Peacekeepers Summit'
  //     },
  //     {
  //       property: 'og:title',
  //       content: 'Awards | Global Justice, Love, and Peace Movement | Dubai',
  //     },
  //     {
  //       property: 'og:description',
  //       content:
  //         'Explore the prestigious awards conferred by the Justice, Love, and Peace Movement through a non-biased, merit-based process conducted by a 28-member global committee across 23 countries. Honoring individuals from all professions who have made a significant impact on society.',
  //     },
  //     {
  //       property: 'og:image',
  //       content:
  //         'http://www.justice-love-peace.com/assets/UIComponents/images/logo.jpg',
  //     },
  //     {
  //       property: 'og:url',
  //       content: 'https://www.justice-love-peace.com/awards',
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
