import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PeaceShopComponent } from './peace-shop.component';

describe('PeaceShopComponent', () => {
  let component: PeaceShopComponent;
  let fixture: ComponentFixture<PeaceShopComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [PeaceShopComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(PeaceShopComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
