import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PeacekeeperPaymentSuccessComponent } from './peacekeeper-payment-success.component';

describe('PeacekeeperPaymentSuccessComponent', () => {
  let component: PeacekeeperPaymentSuccessComponent;
  let fixture: ComponentFixture<PeacekeeperPaymentSuccessComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [PeacekeeperPaymentSuccessComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(PeacekeeperPaymentSuccessComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
