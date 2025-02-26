import { ComponentFixture, TestBed } from '@angular/core/testing';

import { VisitorTermsOnditionsComponent } from './visitor-terms-conditions.component';

describe('VisitorTermsOnditionsComponent', () => {
  let component: VisitorTermsOnditionsComponent;
  let fixture: ComponentFixture<VisitorTermsOnditionsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ VisitorTermsOnditionsComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(VisitorTermsOnditionsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
