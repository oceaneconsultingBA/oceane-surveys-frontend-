import { TestBed } from '@angular/core/testing';

import { RecipientServiceService } from './recipient-service.service';

describe('RecipientServiceService', () => {
  let service: RecipientServiceService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(RecipientServiceService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
