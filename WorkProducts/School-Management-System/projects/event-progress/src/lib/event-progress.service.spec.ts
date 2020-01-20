import { TestBed } from '@angular/core/testing';

import { EventProgressService } from './event-progress.service';

describe('EventProgressService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: EventProgressService = TestBed.get(EventProgressService);
    expect(service).toBeTruthy();
  });
});
