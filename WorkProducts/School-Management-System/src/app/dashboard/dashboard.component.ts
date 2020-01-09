import { Component, OnInit } from '@angular/core';
import { EventService } from '../event.service';
import { HttpErrorResponse } from '@angular/common/http';
import { Router } from '@angular/router';

/** Calendar Model */
import { Event, CalendarTypeDay, CalendarTypeMonth } from 'calendar-scheduler';

export interface Tile {
  color: string;
  cols: number;
  rows: number;
  text: string;
}

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent implements OnInit {

  tiles: Tile[] = [
    {text: 'One', cols: 1, rows: 1, color: 'lightblue'},
    {text: 'Two', cols: 1, rows: 1, color: 'lightgreen'},
    {text: 'Three', cols: 1, rows: 1, color: 'lightpink'},
    {text: 'Four', cols: 1, rows: 1, color: '#DDBDF1'},
    {text: 'One', cols: 1, rows: 1, color: 'lightblue'},
    {text: 'Two', cols: 1, rows: 1, color: 'lightgreen'},
    {text: 'Three', cols: 1, rows: 1, color: 'lightpink'},
    {text: 'Four', cols: 1, rows: 1, color: '#DDBDF1'},
    {text: 'One', cols: 1, rows: 1, color: 'lightblue'},
    {text: 'Two', cols: 1, rows: 1, color: 'lightgreen'},
    {text: 'Three', cols: 1, rows: 1, color: 'lightpink'},
    {text: 'Four', cols: 1, rows: 1, color: '#DDBDF1'},
  ];
  data = []

  allDay = new Date(2020, 2, 0).getDate();

  _event = new Event();
  _calendarTypeDay = new CalendarTypeDay();
  _calendarType = 'CalendarTypeMonth';
  _calendarTypeMonth = new CalendarTypeMonth();

  constructor(private _eventService: EventService,
              private _router: Router) { }

  ngOnInit() {
    this._eventService.getDashboard()
      .subscribe(
        res => this.data = res,
        err => {
          if (err instanceof HttpErrorResponse){
            if (err.status === 401){
              this._router.navigate(['/login'])
            }
          }
        }
      )
    
    this._event.startdate = new Date("January 3, 2020");
    this._event.enddate = new Date("January 5, 2020");
    this._event.name = "1st event";
    this._event.content = "Meeting at 3rd floor";
    this._event.note = "Bring book, notebook";
    this._event.progress = "On Going";
    this._event.priority = "High";
    this._event.type = "Meeting";
    this._event.location = "Room 301 Floor 3rd";
    console.log(this._event.containDay(new Date("January 3, 2020")));


    this._calendarTypeDay.selectedDay = new Date("January 3, 2020");
    this._calendarTypeDay.events.push(this._event);
    this._calendarTypeDay.events.push(this._event);

    this._calendarTypeMonth.selectedMonth = 1; // February
    this._calendarTypeMonth.selectedYear = 2020;
    this._calendarTypeMonth.events.push(this._event);
    this._calendarTypeMonth.events.push(this._event);

    // this._eventService.createEvent(this._event)
    //     .subscribe(
    //       res => console.log(res),
    //       err => console.log(err)
    //     )
  }

  DayDetailView(event){
    console.log(event);
  }
}


/** Class CalendarScheduler */
export class CalendarSchedulerClass{

}
