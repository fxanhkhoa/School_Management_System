import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CalendarSchedulerHeaderComponent } from './calendar-scheduler-header.component';

describe('CalendarSchedulerHeaderComponent', () => {
  let component: CalendarSchedulerHeaderComponent;
  let fixture: ComponentFixture<CalendarSchedulerHeaderComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CalendarSchedulerHeaderComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CalendarSchedulerHeaderComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
