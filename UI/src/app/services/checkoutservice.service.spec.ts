import { TestBed } from '@angular/core/testing';

import { CheckoutserviceService } from './checkoutservice.service';

describe('CheckoutserviceService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: CheckoutserviceService = TestBed.get(CheckoutserviceService);
    expect(service).toBeTruthy();
  });
});
