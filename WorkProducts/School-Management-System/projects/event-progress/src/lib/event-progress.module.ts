import { NgModule } from '@angular/core';
import { EventProgressComponent } from './event-progress.component';

import { MatProgressBarModule } from '@angular/material';

@NgModule({
  declarations: [EventProgressComponent],
  imports: [
    MatProgressBarModule,
  ],
  exports: [EventProgressComponent]
})
export class EventProgressModule { }
