import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ChairmanCornerComponent } from './chairman-corner.component';

describe('ChairmanCornerComponent', () => {
  let component: ChairmanCornerComponent;
  let fixture: ComponentFixture<ChairmanCornerComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ChairmanCornerComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ChairmanCornerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
