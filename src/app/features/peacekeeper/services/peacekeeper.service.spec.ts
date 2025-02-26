import { TestBed } from '@angular/core/testing';

import { PeacekeeperService } from './peacekeeper.service';

describe('PeacekeeperService', () => {
  let service: PeacekeeperService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(PeacekeeperService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
