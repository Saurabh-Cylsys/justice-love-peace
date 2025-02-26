import { ComponentFixture, TestBed } from '@angular/core/testing';

import { HumanValuesComponent } from './human-values.component';

describe('HumanValuesComponent', () => {
  let component: HumanValuesComponent;
  let fixture: ComponentFixture<HumanValuesComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ HumanValuesComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(HumanValuesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
