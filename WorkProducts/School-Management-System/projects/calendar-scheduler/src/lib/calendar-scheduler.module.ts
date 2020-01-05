import { NgModule } from '@angular/core';
import { CalendarSchedulerComponent } from './calendar-scheduler.component';

import { MatGridListModule } from '@angular/material';
import { BrowserModule } from '@angular/platform-browser';


@NgModule({
  declarations: [CalendarSchedulerComponent],
  imports: [
    BrowserModule,
    MatGridListModule
  ],
  exports: [CalendarSchedulerComponent]
})
export class CalendarSchedulerModule { }
