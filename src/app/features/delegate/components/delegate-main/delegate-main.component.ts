import { Component } from '@angular/core';
declare var AOS:any;
@Component({
  selector: 'app-delegate-main',
  templateUrl: './delegate-main.component.html',
  styleUrls: ['./delegate-main.component.css']
})

export class DelegateMainComponent {
  ngOnInit(): void {
    AOS.init({
      duration: 1200,
  })
  }
}
