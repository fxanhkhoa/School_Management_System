import { NgModule } from '@angular/core';
import { EventProgressComponent } from './event-progress.component';

import { MatProgressBarModule, MatExpansionModule, MatListModule, MatDividerModule, MAT_DATE_LOCALE } from '@angular/material';
import { MatTableModule } from '@angular/material';
import { CommonModule } from '@angular/common';

@NgModule({
  declarations: [EventProgressComponent],
  imports: [
    MatProgressBarModule,
    MatExpansionModule,
    MatListModule,
    MatDividerModule,
    CommonModule,
    MatTableModule
  ],
  providers: [
    {provide: MAT_DATE_LOCALE, useValue: 'en-GB'}
  ],
  exports: [EventProgressComponent]
})
export class EventProgressModule { }
