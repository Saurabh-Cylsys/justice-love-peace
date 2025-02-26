import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PeacekeeperPreselectComponent } from './peacekeeper-preselect.component';

describe('PeacekeeperPreselectComponent', () => {
  let component: PeacekeeperPreselectComponent;
  let fixture: ComponentFixture<PeacekeeperPreselectComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ PeacekeeperPreselectComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(PeacekeeperPreselectComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
