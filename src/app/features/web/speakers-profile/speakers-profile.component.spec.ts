import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SpeakersProfileComponent } from './speakers-profile.component';

describe('SpeakersProfileComponent', () => {
  let component: SpeakersProfileComponent;
  let fixture: ComponentFixture<SpeakersProfileComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ SpeakersProfileComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(SpeakersProfileComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
