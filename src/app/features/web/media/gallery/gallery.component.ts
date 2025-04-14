import { Component } from '@angular/core';

@Component({
  selector: 'app-gallery',
  templateUrl: './gallery.component.html',
  styleUrl: './gallery.component.css'
})
export class GalleryComponent {


  imageStates: { [key: string]: string } = {
    'newspaper1': 'normal',
    'newspaper2': 'normal',
    'newspaper3': 'normal',
    'newspaper4': 'normal'
  };

  imagesLoaded = false;

  ngOnInit() {
    // Simulate loading delay for demonstration purposes
    setTimeout(() => {
      this.imagesLoaded = true;
    }, 300);
  }

  onMouseEnter(image: string) {
    this.imageStates[image] = 'hovered';
  }

  onMouseLeave(image: string) {
    this.imageStates[image] = 'normal';
  }
}
