import { Component, HostListener } from '@angular/core';
import { SharedService } from '../../../../app/shared/services/shared.service';
@Component({
  selector: 'app-stay-tuned',
  templateUrl: './stay-tuned.component.html',
  styleUrl: './stay-tuned.component.scss'
})
export class StayTunedComponent {
  isMobileView = false;

  constructor(
    private SharedService: SharedService,
  ) {}

  ngOnInit(): void {
    this.checkWindowSize();
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
}
