import { TestBed, inject } from '@angular/core/testing';

import { ServiceTargetsService } from './service-targets.service';

describe('ServiceTargetsService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [ServiceTargetsService]
    });
  });

  it('should be created', inject([ServiceTargetsService], (service: ServiceTargetsService) => {
    expect(service).toBeTruthy();
  }));
});
