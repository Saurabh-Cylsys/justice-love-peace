import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DelegateRegistrationOnlineComponent } from './delegate-registration-online.component';

describe('DelegateRegistrationOnlineComponent', () => {
  let component: DelegateRegistrationOnlineComponent;
  let fixture: ComponentFixture<DelegateRegistrationOnlineComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ DelegateRegistrationOnlineComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(DelegateRegistrationOnlineComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
