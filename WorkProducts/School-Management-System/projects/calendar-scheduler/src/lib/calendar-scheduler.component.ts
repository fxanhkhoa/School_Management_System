import { Component, OnInit, Input } from '@angular/core';

import { Event } from './model/event';
import { CalendarTypeDay } from './model/calendar-type-day';

export interface Tile {
  color: string;
  cols: number;
  rows: number;
  text: string;
}

@Component({
  selector: 'fx-CalendarScheduler',
  templateUrl: 'calendar-scheduler.component.html',
  styleUrls: ['calendar-scheduler.component.css']
})
export class CalendarSchedulerComponent implements OnInit {

  tiles: Tile[] = [
    {text: 'One', cols: 3, rows: 1, color: 'lightblue'},
    {text: 'Two', cols: 1, rows: 2, color: 'lightgreen'},
    {text: 'Three', cols: 1, rows: 1, color: 'lightpink'},
    {text: 'Four', cols: 2, rows: 1, color: '#DDBDF1'},
  ];

  @Input() calendarTypeDay: CalendarTypeDay;
  
  constructor() { }

  ngOnInit() {
  }

  

}
