import { TestBed } from '@angular/core/testing';

import { ReuseRouteStrategyService } from './reuse-route-strategy.service';

describe('ReuseRouteStrategyService', () => {
  let service: ReuseRouteStrategyService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ReuseRouteStrategyService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
