import { TestBed, inject } from '@angular/core/testing';

import { EndpointObserverService } from './endpoint-observer.service';

describe('EndpointObserverService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [EndpointObserverService]
    });
  });

  it('should be created', inject([EndpointObserverService], (service: EndpointObserverService) => {
    expect(service).toBeTruthy();
  }));
});
