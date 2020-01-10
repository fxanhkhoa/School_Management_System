import { Component, OnInit, Input, Output, EventEmitter} from '@angular/core';

import { Event } from './model/event';
import { CalendarTypeDay } from './model/calendar-type-day';
import { CalendarTypeMonth } from './model/calendar-type-month';

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
  ];

  @Input() type: String;
  @Input() calendarTypeDay: CalendarTypeDay;
  @Input() calendarTypeMonth: CalendarTypeMonth;

  @Output('CalendarDateClick') dayClick: EventEmitter<Date> = new EventEmitter<Date>();
  
  panelOpenState = false;
  Arr = Array;
  firstDayOfMonth: number;
  dayInMonth: number;

  monthStr: String[] = [
    'January',
    'February',
    'March',
    'April',
    'May',
    'June',
    'July',
    'August',
    'September',
    'October',
    'November',
    'December'
  ];

  today: Date;

  tempDate: Date;
  // Variable for events in day used in function getAllEventInDay
  eventsInDay: Event[] = [];
  numberOfEventInDay: number = 0;
  numberOfEventInDayInMonth: number[] = [];
  eventsInDayInMonth: Event[][] = [];
  // Variable for dataloaded
  dataLoaded: Boolean = false;
  // Variable used for ng-template
  currentDay:number = 0;
  currentEventIndexInDay: number = 0;

  constructor() { 

  }

  ngOnInit() {
    // Get Days in month
    this.dayInMonth = this.calendarTypeMonth.getDaysOfMonth();
    // Get First day of month
    this.firstDayOfMonth = this.calendarTypeMonth.getFirstDayOfMonth();
    // Get Today
    this.today = new Date();
    // Initialize all zero to numberOfEventInDayInMonth
    this.fillAllZero();
    // Init all event for days
    this.getAllEventInMonth();
    // console.log(this.eventsInDayInMonth);
    // console.log(this.numberOfEventInDayInMonth);
    // Set Loaded
    this.dataLoaded = true;
  }

  fillAllZero(){
    let numbers = Array(this.dayInMonth).fill(null).map((x, i) => i + 1);
    for (let i of numbers){
      this.numberOfEventInDayInMonth[+i] = 0;
      this.eventsInDayInMonth[+i] = [];
    }
  }

  arrayOne(n: number): any[] {
    return Array(n);
  }

  getDateOfToday(){
    return this.today.getDate();
  }

  buttonDayClick(day){
    let tempDate = new Date();
    tempDate.setDate(day);
    tempDate.setMonth(this.calendarTypeMonth.selectedMonth - 1); // Because month from 0 -> 11
    tempDate.setFullYear(this.calendarTypeMonth.selectedYear);

    this.dayClick.emit(tempDate);
  }

  getAllEventInDay(day){
    let tempDate = new Date();
    
    tempDate.setDate(day);
    tempDate.setMonth(this.calendarTypeMonth.selectedMonth - 1); // Because month from 0 -> 11
    tempDate.setFullYear(this.calendarTypeMonth.selectedYear);
    
    // clear event
    this.eventsInDay = [];
    // Initialize number of event in day to 0
    this.numberOfEventInDay = 0;

    this.calendarTypeMonth.events.forEach(event =>{
      // Check if this 'day' contain this event
      if (event.containDay(tempDate) == true){
        // add to eventsInDay array
        this.eventsInDay.push(event);
      }
    });

    // Set number of events in day
    this.numberOfEventInDay = this.eventsInDay.length;
  }

  getAllEventInMonth(){
    let numbers = Array(this.dayInMonth).fill(null).map((x, i) => i + 1);
    for (let i of numbers){
      let tempDate = new Date();
      tempDate.setDate(+i);
      tempDate.setMonth(this.calendarTypeMonth.selectedMonth - 1); // Because month from 0 -> 11
      tempDate.setFullYear(this.calendarTypeMonth.selectedYear);
      this.calendarTypeMonth.events.forEach(event =>{
        // Check if this 'day' contain this event
        if (event.containDay(tempDate) == true){
          // add to eventsInDay array
          this.eventsInDayInMonth[+i].push(event);
          if (event.enddate.getDate() <= +i){
            this.calendarTypeMonth.events.filter(item => item !== event);
          }
        }
      });

      // Set number of events for this day
      this.numberOfEventInDayInMonth[+i] = this.eventsInDayInMonth[+i].length;
    }
  }

  setCurrentEvent(currentDay, currentEventIndexInDay){
    this.currentDay = currentDay;
    this.currentEventIndexInDay = currentEventIndexInDay;
    // console.log(this.currentEvent);
  }
}
