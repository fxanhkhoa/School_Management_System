import { NgModule } from '@angular/core';
import { EventProgressComponent } from './event-progress.component';

import { MatProgressBarModule, MatExpansionModule, MatListModule, MatDividerModule } from '@angular/material';
import { CommonModule } from '@angular/common';

@NgModule({
  declarations: [EventProgressComponent],
  imports: [
    MatProgressBarModule,
    MatExpansionModule,
    MatListModule,
    MatDividerModule,
    CommonModule
  ],
  exports: [EventProgressComponent]
})
export class EventProgressModule { }
