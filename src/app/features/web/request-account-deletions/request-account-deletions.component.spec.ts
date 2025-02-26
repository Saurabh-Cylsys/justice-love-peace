import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RequestAccountDeletionsComponent } from './request-account-deletions.component';

describe('RequestAccountDeletionsComponent', () => {
  let component: RequestAccountDeletionsComponent;
  let fixture: ComponentFixture<RequestAccountDeletionsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ RequestAccountDeletionsComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(RequestAccountDeletionsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
