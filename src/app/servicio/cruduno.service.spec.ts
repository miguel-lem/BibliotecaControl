import { TestBed } from '@angular/core/testing';

import { CrudunoService } from './cruduno.service';

describe('CrudunoService', () => {
  let service: CrudunoService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(CrudunoService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
