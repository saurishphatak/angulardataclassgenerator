import { TestBed } from '@angular/core/testing';

import { CsharpService } from './csharp.service';

describe('CsharpService', () => {
  let service: CsharpService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(CsharpService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
