import { Component, OnInit } from '@angular/core';
import { trigger, state, style, animate, transition, query, stagger } from '@angular/animations';

@Component({
  selector: 'app-news-paper',
  templateUrl: './news-paper.component.html',
  styleUrls: ['./news-paper.component.css']
})
export class NewsPaperComponent implements OnInit {
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
