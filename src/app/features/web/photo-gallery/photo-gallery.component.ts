import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';

interface GalleryImage {
  path: string;
}

interface GalleryCategory {
  category: string;
  images: GalleryImage[];
}

@Component({
  selector: 'app-photo-gallery',
  templateUrl: './photo-gallery.component.html',
  styleUrl: './photo-gallery.component.css'
})
export class PhotoGalleryComponent implements OnInit {
  galleryData: GalleryCategory[] = [];

  constructor(private http: HttpClient) {}

  ngOnInit(): void {
    this.http.get<GalleryCategory[]>('assets/gallery.json').subscribe(
      (data) => {
        this.galleryData = data;
      },
      (error) => {
        console.error('Error loading gallery data:', error);
      }
    );
  }

  showImage(imageSrc: string): void {
    const popupImage = document.getElementById('popupImage') as HTMLImageElement;
    if (popupImage) {
      popupImage.src = imageSrc;
    }
  }
}
