import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CalendaSchedulerComponent } from './calenda-scheduler.component';

describe('CalendaSchedulerComponent', () => {
  let component: CalendaSchedulerComponent;
  let fixture: ComponentFixture<CalendaSchedulerComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CalendaSchedulerComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CalendaSchedulerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
