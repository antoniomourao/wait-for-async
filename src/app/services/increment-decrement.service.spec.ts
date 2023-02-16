import { TestBed } from '@angular/core/testing';

import { IncrementDecrementService } from './increment-decrement.service';

describe('Increment Decrement Service Unit Test', () => {
  let service: IncrementDecrementService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [IncrementDecrementService],
    });
    service = TestBed.get(IncrementDecrementService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
