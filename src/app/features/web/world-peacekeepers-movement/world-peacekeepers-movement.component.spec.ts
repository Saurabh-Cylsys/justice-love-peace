import { ComponentFixture, TestBed } from '@angular/core/testing';

import { WorldPeacekeepersMovementComponent } from './world-peacekeepers-movement.component';

describe('WorldPeacekeepersMovementComponent', () => {
  let component: WorldPeacekeepersMovementComponent;
  let fixture: ComponentFixture<WorldPeacekeepersMovementComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ WorldPeacekeepersMovementComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(WorldPeacekeepersMovementComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
