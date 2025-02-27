import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DelegateWithChildComponent } from './delegate-with-child.component';

describe('DelegateWithChildComponent', () => {
  let component: DelegateWithChildComponent;
  let fixture: ComponentFixture<DelegateWithChildComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ DelegateWithChildComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(DelegateWithChildComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
