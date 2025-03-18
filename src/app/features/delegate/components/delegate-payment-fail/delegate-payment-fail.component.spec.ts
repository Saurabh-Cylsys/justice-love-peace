import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DelegatePaymentFailComponent } from './delegate-payment-fail.component';

describe('DelegatePaymentFailComponent', () => {
  let component: DelegatePaymentFailComponent;
  let fixture: ComponentFixture<DelegatePaymentFailComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ DelegatePaymentFailComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(DelegatePaymentFailComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
