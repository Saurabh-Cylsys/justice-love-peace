import { DOCUMENT } from '@angular/common';
import { Component, Inject, Renderer2 } from '@angular/core';
import { Meta, Title } from '@angular/platform-browser';

@Component({
  selector: 'app-terms-of-use',
  templateUrl: './terms-of-use.component.html',
  styleUrls: ['./terms-of-use.component.css']
})
export class TermsOfUseComponent {
constructor(
    private titleService: Title,
    private metaService: Meta,
    private renderer: Renderer2,
    @Inject(DOCUMENT) private document: Document
  ) {}

  ngOnInit(): void {
    this.setMetaTags();
    this.setCanonicalUrl('https://www.justice-love-peace.com/terms-of-use');
  }
  setMetaTags(): void {
    this.titleService.setTitle('Terms of Use | Global Justice, Love, and Peace Summit 2025');

    this.metaService.addTags([
      {
        name: 'description',
        content: "Review the Terms of Use for the Global Justice, Love, and Peace Summit 2025 in Dubai. Understand the guidelines and policies to ensure a safe and enjoyable experience at the event."
      },
      {
        name: 'title',
        content: 'Terms of Use | Global Justice, Love, and Peace Summit 2025'
      },
      {
        property: 'og:title',
        content: 'Terms of Use | Global Justice, Love, and Peace Summit 2025'
      },
      {
        property: 'og:description',
        content: "Review the Terms of Use for the Global Justice, Love, and Peace Summit 2025 in Dubai. Understand the guidelines and policies to ensure a safe and enjoyable experience at the event."
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
