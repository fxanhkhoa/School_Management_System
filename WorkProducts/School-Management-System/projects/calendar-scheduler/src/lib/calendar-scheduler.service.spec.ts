import { TestBed } from '@angular/core/testing';

import { CalendarSchedulerService } from './calendar-scheduler.service';

describe('CalendarSchedulerService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: CalendarSchedulerService = TestBed.get(CalendarSchedulerService);
    expect(service).toBeTruthy();
  });
});
