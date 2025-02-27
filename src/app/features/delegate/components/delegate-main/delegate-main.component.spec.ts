import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DelegateMainComponent } from './delegate-main.component';

describe('DelegateMainComponent', () => {
  let component: DelegateMainComponent;
  let fixture: ComponentFixture<DelegateMainComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ DelegateMainComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(DelegateMainComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
