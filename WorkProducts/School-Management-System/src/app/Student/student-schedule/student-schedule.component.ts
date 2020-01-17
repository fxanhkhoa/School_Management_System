import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from '../../utils/services/auth.service';
import { EventService } from 'src/app/utils/services/event.service';
import { CalendarTypeDay, CalendarTypeMonth, Event } from 'calendar-scheduler';
import { tap, map } from 'rxjs/operators';

@Component({
  selector: 'app-student-schedule',
  templateUrl: './student-schedule.component.html',
  styleUrls: ['./student-schedule.component.css']
})
export class StudentScheduleComponent implements OnInit {

  /**
   * TODO: Define global variables
   */

  _calendarType: String = 'CalendarTypeMonth';
  _calendarTypeDay = new CalendarTypeDay();
  _calendarTypeMonth = new CalendarTypeMonth();
  _event = new Event();
  allevents:Event[] = [];

  loadedSignal: Boolean = false;

  /**
   * 
   * @param _router 
   * @param _auth 
   * @param _eventService 
   */
  constructor(private _router: Router,
              private _auth: AuthService,
              private _eventService: EventService) { }

  /**
   * TODO: Check role before use
   * TODO: Get all events of user
   * * Algorithm:
   * * If role is not admin or student then back to login
   */
  ngOnInit() {
    console.log(sessionStorage.getItem('role'));
    if ((!this._auth.isAdmin()) && (!this._auth.isStudent())){
      this._router.navigate(['/login']);
    } else {
      /** Do nothing */
    }

    // TODO: Set month and year
    var d = new Date();
    this._calendarTypeMonth.selectedMonth = d.getMonth() + 1; // ! Month is from 0 - 11
    this._calendarTypeMonth.selectedYear = d.getFullYear();
    this.getEvents();
    console.log(this._calendarTypeMonth.events);
    this.loadedSignal = true;
  }


  getEvents(){
    let email = sessionStorage.getItem('email')

    // TODO: Call get all events of user API
    this._eventService.getEventsOfUser({email})
      .subscribe(
        res => {
          this.allevents = res;
          console.log(res)
          for (let i = 0; i < res.length; i++){
            this._event = new Event();
            this._event.startdate = new Date(res[i].startdate);
            this._event.enddate = new Date(res[i].enddate);
            this._event.name = res[i].name;
            this._event.content = res[i].content;
            this._event.note = res[i].note;
            this._event.progress = res[i].progress;
            this._event.priority = res[i].priority;
            this._event.type = res[i].type;
            this._event.location = res[i].location;

            this.allevents.push(this._event);
            // console.log(newEvent)
          }
        },
        err => console.log(err)
      )

    console.log(this.allevents);
    for (let i = 0; i < this.allevents.length; i++){
      this._calendarTypeMonth.events.push(this.allevents[i]);
    }
    console.log(this._calendarTypeMonth.events);
  }

  /**
   * TODO: Set type for Calendar
   * @param value 
   */
  setType(value){
    this._calendarType = value;
  }

  /**
   * TODO: function callback when click a day
   * @param event 
   */
  DayDetailView(event){
    console.log(event);
  }
}
