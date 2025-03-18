import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DelegateMessageComponent } from './delegate-message.component';

describe('DelegateMessageComponent', () => {
  let component: DelegateMessageComponent;
  let fixture: ComponentFixture<DelegateMessageComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ DelegateMessageComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(DelegateMessageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
