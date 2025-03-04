import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-photos',
  templateUrl: './photos.component.html',
  styleUrls: ['./photos.component.css']
})
export class PhotosComponent implements OnInit {
  images: string[] = [];
  folderPath = 'assets/UIComponents/images/media/gallery/';
  loadingStates: { [key: string]: boolean } = {};

  ngOnInit() {
    this.loadImages();
  }

  private loadImages() {
    const imageFiles = [
      'MAN00263.jpg', 'MAN00266.jpg', 'MAN00271.jpg', 'MAN00273.jpg',
      'MAN00275.jpg', 'MAN00287.jpg', 'MAN00293.jpg', 'MAN00295.jpg',
      'MAN00299.jpg', 'MAN00303.jpg', 'MAN00313.jpg', 'MAN00318.jpg'
    ];

    this.images = imageFiles.map(filename => `${this.folderPath}${filename}`);
  }

  handleImageError(event: any) {
    const img = event.target;
    img.style.display = 'none';
  }
}
