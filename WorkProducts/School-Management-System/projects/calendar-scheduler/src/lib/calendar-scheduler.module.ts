import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { CalendarSchedulerComponent } from './calendar-scheduler.component';

import { MatGridListModule, MatCardModule, MatIconModule, MatExpansionModule } from '@angular/material';
import { MatButtonModule } from '@angular/material';
import { MatListModule, MatDividerModule } from '@angular/material';
import { BrowserModule } from '@angular/platform-browser';
import { CalendarSchedulerHeaderComponent } from './calendar-scheduler-header/calendar-scheduler-header.component';
import { ToolTipRendererDirective } from './tool-tip-renderer.directive';
import { CustomToolTipComponent } from './custom-tool-tip/custom-tool-tip.component';

@NgModule({
  declarations: [CalendarSchedulerComponent, CalendarSchedulerHeaderComponent, ToolTipRendererDirective, CustomToolTipComponent],
  imports: [
    BrowserModule,
    CommonModule,
    MatGridListModule,
    MatCardModule,
    MatIconModule,
    MatExpansionModule,
    MatListModule,
    MatDividerModule,
    MatButtonModule
  ],
  exports: [CalendarSchedulerComponent, CalendarSchedulerHeaderComponent],
  entryComponents: [CustomToolTipComponent]
})
export class CalendarSchedulerModule { }
