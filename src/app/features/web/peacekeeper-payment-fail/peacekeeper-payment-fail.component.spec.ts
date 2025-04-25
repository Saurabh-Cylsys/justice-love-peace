import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PeacekeeperPaymentFailComponent } from './peacekeeper-payment-fail.component';

describe('PeacekeeperPaymentFailComponent', () => {
  let component: PeacekeeperPaymentFailComponent;
  let fixture: ComponentFixture<PeacekeeperPaymentFailComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [PeacekeeperPaymentFailComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(PeacekeeperPaymentFailComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
