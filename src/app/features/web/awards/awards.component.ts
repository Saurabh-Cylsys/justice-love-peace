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
  currentSection = 'aw1';
  constructor(
    private _activeRouter: ActivatedRoute,
    private SharedService: SharedService,
    private titleService: Title,
        private metaService: Meta,
        private renderer: Renderer2,
        @Inject(DOCUMENT) private document: Document
  ) {}

  ngOnInit(): void {
    this.setMetaTags();
    this.setCanonicalUrl('https://www.justice-love-peace.com/awards');
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
  setMetaTags(): void {
    this.titleService.setTitle('Awards | Global Justice, Love, and Peace Movement | Dubai');

    this.metaService.addTags([
      {
        name: 'description',
        content: "Explore the prestigious awards conferred by the Justice, Love, and Peace Movement through a non-biased, merit-based process conducted by a 28-member global committee across 23 countries. Honoring individuals from all professions who have made a significant impact on society."
      },
      {
        name: 'title',
        content: "Awards | Global Justice, Love, and Peace Movement | Dubai"
      },
      {
        property: 'og:title',
        content: 'Awards | Global Justice, Love, and Peace Movement | Dubai'
      },
      {
        property: 'og:description',
        content: "Explore the prestigious awards conferred by the Justice, Love, and Peace Movement through a non-biased, merit-based process conducted by a 28-member global committee across 23 countries. Honoring individuals from all professions who have made a significant impact on society."
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

  @HostListener('window:scroll', ['$event'])
  onScroll() {
    const sections = ['aw1', 'aw3'];
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
