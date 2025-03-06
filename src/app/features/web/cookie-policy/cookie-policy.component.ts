import { DOCUMENT } from '@angular/common';
import { Component, Inject, Renderer2 } from '@angular/core';
import { Meta, Title } from '@angular/platform-browser';

@Component({
  selector: 'app-cookie-policy',
  templateUrl: './cookie-policy.component.html',
  styleUrls: ['./cookie-policy.component.css']
})
export class CookiePolicyComponent {
constructor(
    private titleService: Title,
    private metaService: Meta,
    private renderer: Renderer2,
    @Inject(DOCUMENT) private document: Document
  ) {}

  ngOnInit(): void {
    this.setMetaTags();
    this.setCanonicalUrl('https://www.justice-love-peace.com/cookie-policy');
  }
  setMetaTags(): void {
    this.titleService.setTitle('Cookie Policy | Global Justice, Love, and Peace Summit 2025');

    this.metaService.addTags([
      {
        name: 'description',
        content: "Learn about the use of cookies on the Global Justice, Love, and Peace Summit 2025 website. Understand how we collect and manage your data to enhance your browsing experience."
      },
      {
        name: 'title',
        content: 'Cookie Policy | Global Justice, Love, and Peace Summit 2025'
      },
      {
        property: 'og:title',
        content: 'Cookie Policy | Global Justice, Love, and Peace Summit 2025'
      },
      {
        property: 'og:description',
        content: "Learn about the use of cookies on the Global Justice, Love, and Peace Summit 2025 website. Understand how we collect and manage your data to enhance your browsing experience."
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
