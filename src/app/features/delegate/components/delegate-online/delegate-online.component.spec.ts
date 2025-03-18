import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DelegateOnlineComponent } from './delegate-online.component';

describe('DelegateOnlineComponent', () => {
  let component: DelegateOnlineComponent;
  let fixture: ComponentFixture<DelegateOnlineComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ DelegateOnlineComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(DelegateOnlineComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
