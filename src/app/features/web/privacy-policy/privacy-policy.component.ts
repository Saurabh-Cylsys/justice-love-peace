import { DOCUMENT } from '@angular/common';
import { Component, Inject, Renderer2 } from '@angular/core';
import { Meta, Title } from '@angular/platform-browser';

@Component({
  selector: 'app-privacy-policy',
  templateUrl: './privacy-policy.component.html',
  styleUrls: ['./privacy-policy.component.css']
})
export class PrivacyPolicyComponent {
constructor(
    private titleService: Title,
    private metaService: Meta,
    private renderer: Renderer2,
    @Inject(DOCUMENT) private document: Document
  ) {}

  ngOnInit(): void {
    this.setMetaTags();
    this.setCanonicalUrl('https://www.justice-love-peace.com/privacy-policy');
  }
  setMetaTags(): void {
    this.titleService.setTitle('Privacy Policy | Global Justice, Love, and Peace Summit 2025');

    this.metaService.addTags([
      {
        name: 'description',
        content: "Review the Privacy Policy for the Global Justice, Love, and Peace Summit 2025 in Dubai. Understand how we collect, use, and protect your personal information to ensure a secure and transparent experience."
      },
      {
        name: 'title',
        content: 'Privacy Policy | Global Justice, Love, and Peace Summit 2025'
      },
      {
        property: 'og:title',
        content: 'Privacy Policy | Global Justice, Love, and Peace Summit 2025'
      },
      {
        property: 'og:description',
        content: "Review the Privacy Policy for the Global Justice, Love, and Peace Summit 2025 in Dubai. Understand how we collect, use, and protect your personal information to ensure a secure and transparent experience."
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
