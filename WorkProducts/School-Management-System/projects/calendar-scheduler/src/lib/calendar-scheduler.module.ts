import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { CalendarSchedulerComponent } from './calendar-scheduler.component';

import { MatGridListModule, MatCardModule, MatIconModule, MatExpansionModule } from '@angular/material';
import { MatListModule, MatDividerModule } from '@angular/material';
import { BrowserModule } from '@angular/platform-browser';
import { CalendarSchedulerHeaderComponent } from './calendar-scheduler-header/calendar-scheduler-header.component';

@NgModule({
  declarations: [CalendarSchedulerComponent, CalendarSchedulerHeaderComponent],
  imports: [
    BrowserModule,
    CommonModule,
    MatGridListModule,
    MatCardModule,
    MatIconModule,
    MatExpansionModule,
    MatListModule,
    MatDividerModule
  ],
  exports: [CalendarSchedulerComponent, CalendarSchedulerHeaderComponent]
})
export class CalendarSchedulerModule { }
