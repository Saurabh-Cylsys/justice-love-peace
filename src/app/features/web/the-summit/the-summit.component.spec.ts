import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TheSummitComponent } from './the-summit.component';

describe('TheSummitComponent', () => {
  let component: TheSummitComponent;
  let fixture: ComponentFixture<TheSummitComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ TheSummitComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(TheSummitComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
