import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DelegateEmailPaymentComponent } from './delegate-email-payment.component';

describe('DelegateEmailPaymentComponent', () => {
  let component: DelegateEmailPaymentComponent;
  let fixture: ComponentFixture<DelegateEmailPaymentComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [DelegateEmailPaymentComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(DelegateEmailPaymentComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
