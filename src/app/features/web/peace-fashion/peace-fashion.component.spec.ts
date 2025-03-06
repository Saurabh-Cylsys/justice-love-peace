import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PeaceFashionComponent } from './peace-fashion.component';

describe('PeaceFashionComponent', () => {
  let component: PeaceFashionComponent;
  let fixture: ComponentFixture<PeaceFashionComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [PeaceFashionComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(PeaceFashionComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
