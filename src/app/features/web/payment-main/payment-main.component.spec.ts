import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PaymentMainComponent } from './payment-main.component';

describe('PaymentMainComponent', () => {
  let component: PaymentMainComponent;
  let fixture: ComponentFixture<PaymentMainComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ PaymentMainComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(PaymentMainComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
