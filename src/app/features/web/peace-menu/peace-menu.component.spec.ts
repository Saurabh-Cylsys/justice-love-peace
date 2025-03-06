import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PeaceMenuComponent } from './peace-menu.component';

describe('PeaceMenuComponent', () => {
  let component: PeaceMenuComponent;
  let fixture: ComponentFixture<PeaceMenuComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [PeaceMenuComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(PeaceMenuComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
