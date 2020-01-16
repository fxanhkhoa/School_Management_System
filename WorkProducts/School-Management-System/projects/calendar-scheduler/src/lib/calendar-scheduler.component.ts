import { Component, OnInit, Input, Output, EventEmitter} from '@angular/core';

import { Event } from './model/event';
import { CalendarTypeDay } from './model/calendar-type-day';
import { CalendarTypeMonth } from './model/calendar-type-month';

@Component({
  selector: 'fx-CalendarScheduler',
  templateUrl: 'calendar-scheduler.component.html',
  styleUrls: ['calendar-scheduler.component.css']
})
export class CalendarSchedulerComponent implements OnInit {

  /**
   * * All input for binding
   * ! Take care when change the name,
   * ! it may conflict to other parts
   */
  @Input() type: String;
  @Input() calendarTypeDay: CalendarTypeDay;
  @Input() calendarTypeMonth: CalendarTypeMonth;

  /**
   * * All output for binding
   * ! Take care when change the name,
   * ! it may conflict to other parts
   */
  @Output('CalendarDateClick') dayClick: EventEmitter<Date> = new EventEmitter<Date>();
  
  /**
   * * All Global variables
   */
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

  /**
   * TODO: Initialize global variables
   */
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
    // ! Debug part
    // console.log(this.eventsInDayInMonth);
    // console.log(this.numberOfEventInDayInMonth);
    // Set Loaded
    this.dataLoaded = true;
  }

  /**
   * TODO: Fill All Zero for number of event of day in month
   * TODO: and initialize empty array for events in day in month array
   */
  fillAllZero(){
    let numbers = Array(this.dayInMonth).fill(null).map((x, i) => i + 1);
    for (let i of numbers){
      this.numberOfEventInDayInMonth[+i] = 0;
      this.eventsInDayInMonth[+i] = [];
    }
  }

  /**
   * TODO: create an array from 0->n
   * @param n: count of array
   */
  arrayOne(n: number): any[] {
    return Array(n);
  }

  /**
   * TODO: Get today (Day, month, year, hh, mm, ss)
   */
  getDateOfToday(){
    return this.today.getDate();
  }

  /**
   * TODO: Get date of day clicked and emit to parent element
   * @param day: Input day need to emit
   */
  buttonDayClick(day){
    let tempDate = new Date();
    tempDate.setDate(day);
    tempDate.setMonth(this.calendarTypeMonth.selectedMonth - 1); // * Because month from 0 -> 11
    tempDate.setFullYear(this.calendarTypeMonth.selectedYear);

    this.dayClick.emit(tempDate);
  }

  /**
   * TODO: Get all events in day and push to array
   * @param day: Input day need to get events
   */
  getAllEventInDay(day){
    let tempDate = new Date();
    
    tempDate.setDate(day);
    tempDate.setMonth(this.calendarTypeMonth.selectedMonth - 1); // * Because month from 0 -> 11
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

  /**
   * TODO: Get all events in month and push to 2D array 
   */
  getAllEventInMonth(){
    // * Fill numbers with 1-> number of day in month
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

  /**
   * TODO: Set current day to make binding with template 
   * @param currentDay: Day that mouse is pointing to
   * @param currentEventIndexInDay: Use for array 2D
   */
  setCurrentEvent(currentDay, currentEventIndexInDay){
    this.currentDay = currentDay;
    this.currentEventIndexInDay = currentEventIndexInDay;
    // console.log(this.currentEvent);
  }
}
