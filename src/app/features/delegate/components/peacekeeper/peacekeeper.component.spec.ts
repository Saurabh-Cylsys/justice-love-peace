import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PeacekeeperComponent } from './peacekeeper.component';

describe('PeacekeeperComponent', () => {
  let component: PeacekeeperComponent;
  let fixture: ComponentFixture<PeacekeeperComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [PeacekeeperComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(PeacekeeperComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
