import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DelegateWithChildNominationComponent } from './delegate-with-child-nomination.component';

describe('DelegateWithChildNominationComponent', () => {
  let component: DelegateWithChildNominationComponent;
  let fixture: ComponentFixture<DelegateWithChildNominationComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ DelegateWithChildNominationComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(DelegateWithChildNominationComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
