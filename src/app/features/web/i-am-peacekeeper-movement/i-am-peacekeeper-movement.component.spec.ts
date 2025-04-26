import { ComponentFixture, TestBed } from '@angular/core/testing';

import { IAmPeacekeeperMovementComponent } from './i-am-peacekeeper-movement.component';

describe('IAmPeacekeeperMovementComponent', () => {
  let component: IAmPeacekeeperMovementComponent;
  let fixture: ComponentFixture<IAmPeacekeeperMovementComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [IAmPeacekeeperMovementComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(IAmPeacekeeperMovementComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
