import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DelegateRegistrationSeoComponent } from './delegate-registration-seo.component';

describe('DelegateRegistrationSeoComponent', () => {
  let component: DelegateRegistrationSeoComponent;
  let fixture: ComponentFixture<DelegateRegistrationSeoComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ DelegateRegistrationSeoComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(DelegateRegistrationSeoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
