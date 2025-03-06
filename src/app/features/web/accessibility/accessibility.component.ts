import { DOCUMENT } from '@angular/common';
import { Component, Inject, Renderer2 } from '@angular/core';
import { Meta, Title } from '@angular/platform-browser';

@Component({
  selector: 'app-accessibility',
  templateUrl: './accessibility.component.html',
  styleUrls: ['./accessibility.component.css']
})
export class AccessibilityComponent {
constructor(
    private titleService: Title,
    private metaService: Meta,
    private renderer: Renderer2,
    @Inject(DOCUMENT) private document: Document
  ) {}

  ngOnInit(): void {
    this.setMetaTags();
    this.setCanonicalUrl('https://www.justice-love-peace.com/accessibility');
  }
  setMetaTags(): void {
    this.titleService.setTitle('Accessibility Information | Global Justice, Love, and Peace Summit 2025');

    this.metaService.addTags([
      {
        name: 'description',
        content: "Learn about the accessibility features of the Global Justice, Love, and Peace Summit 2025 in Dubai. We provide accessible parking, entrances, seating areas, sign language interpretation, Braille materials, and live captioning to ensure an inclusive experience for all attendees."
      },
      {
        name: 'title',
        content: 'Accessibility Information | Global Justice, Love, and Peace Summit 2025'
      },
      {
        property: 'og:title',
        content: 'Accessibility Information | Global Justice, Love, and Peace Summit 2025'
      },
      {
        property: 'og:description',
        content: "Learn about the accessibility features of the Global Justice, Love, and Peace Summit 2025 in Dubai. We provide accessible parking, entrances, seating areas, sign language interpretation, Braille materials, and live captioning to ensure an inclusive experience for all attendees."
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
