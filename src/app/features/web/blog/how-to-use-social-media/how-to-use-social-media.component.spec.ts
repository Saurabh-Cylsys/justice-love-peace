import { ComponentFixture, TestBed } from '@angular/core/testing';

import { HowToUseSocialMediaComponent } from './how-to-use-social-media.component';

describe('HowToUseSocialMediaComponent', () => {
  let component: HowToUseSocialMediaComponent;
  let fixture: ComponentFixture<HowToUseSocialMediaComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ HowToUseSocialMediaComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(HowToUseSocialMediaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
