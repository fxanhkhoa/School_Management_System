import { Component, OnInit } from '@angular/core';
import { EventService } from '../event.service';
import { HttpErrorResponse } from '@angular/common/http';
import { Router } from '@angular/router';

/** Calendar Model */
import { Event, CalendarTypeDay } from 'calendar-scheduler';


@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent implements OnInit {

  data = []

  allDay = new Date(2020, 2, 0).getDate();

  _event = new Event();
  _calendarTypeDay = new CalendarTypeDay();

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
    
    console.log(this.allDay)
    console.log(new Date("January 4, 2020").getDay())

    this._event.startdate = new Date("January 3, 2020");
    this._event.enddate = new Date("January 5, 2020");
    this._event.name = "1st event";
    console.log(this._event.containDay(new Date("January 3, 2020")));

    this._calendarTypeDay.selectedDay = new Date("January 3, 2020");

    this._eventService.createEvent(this._event)
        .subscribe(
          res => console.log(res),
          err => console.log(err)
        )
  }

}


/** Class CalendarScheduler */
export class CalendarSchedulerClass{

}
