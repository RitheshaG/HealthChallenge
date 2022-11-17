import { TestBed } from '@angular/core/testing';

import { WalkathonService } from './walkathon.service';

describe('WalkathonService', () => {
  let service: WalkathonService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(WalkathonService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
