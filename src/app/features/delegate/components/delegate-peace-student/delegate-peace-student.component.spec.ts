import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DelegatePeaceStudentComponent } from './delegate-peace-student.component';

describe('DelegatePeaceStudentComponent', () => {
  let component: DelegatePeaceStudentComponent;
  let fixture: ComponentFixture<DelegatePeaceStudentComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ DelegatePeaceStudentComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(DelegatePeaceStudentComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
