import { TestBed } from '@angular/core/testing';

import { CalendaSchedulerService } from './calenda-scheduler.service';

describe('CalendaSchedulerService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: CalendaSchedulerService = TestBed.get(CalendaSchedulerService);
    expect(service).toBeTruthy();
  });
});
