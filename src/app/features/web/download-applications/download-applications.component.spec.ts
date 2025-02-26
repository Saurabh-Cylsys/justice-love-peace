import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DownloadApplicationsComponent } from './download-applications.component';

describe('DownloadApplicationsComponent', () => {
  let component: DownloadApplicationsComponent;
  let fixture: ComponentFixture<DownloadApplicationsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ DownloadApplicationsComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(DownloadApplicationsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
