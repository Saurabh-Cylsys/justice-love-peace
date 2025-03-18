import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DelegatePaymentSuccessComponent } from './delegate-payment-success.component';

describe('DelegatePaymentSuccessComponent', () => {
  let component: DelegatePaymentSuccessComponent;
  let fixture: ComponentFixture<DelegatePaymentSuccessComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ DelegatePaymentSuccessComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(DelegatePaymentSuccessComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
