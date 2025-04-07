import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MetroRouteComponent } from './metro-route.component';

describe('MetroRouteComponent', () => {
  let component: MetroRouteComponent;
  let fixture: ComponentFixture<MetroRouteComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [MetroRouteComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(MetroRouteComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
