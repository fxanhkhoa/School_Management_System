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

  // * Signal for UI loading
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
    // TODO: Get all events
    this.getEvents();
  }


  async getEvents(){
    let email = sessionStorage.getItem('email')

    // TODO: Call get all events of user API
    this._eventService.getEventsOfUser({email})
      .subscribe(
        res => {
          // TODO: Check if res is empty then exit
          if (res.length <= 0) return;
          for (let i = 0; i < res.length; i++){
            let newEvent = new Event();
            newEvent.startdate = new Date(res[i].startdate);
            newEvent.enddate = new Date(res[i].enddate);
            newEvent.name = res[i].name;
            newEvent.content = res[i].content;
            newEvent.note = res[i].note;
            newEvent.progress = res[i].progress;
            newEvent.priority = res[i].priority;
            newEvent.type = res[i].type;
            newEvent.location = res[i].location;

            // TODO: Push to Events array
            this._calendarTypeMonth.events.push(newEvent);
          }
          // TODO: Signal to load UI
          // ! Need to do here because this is asynchronous thread
          // ! if no signal it will load first then get API data later
          // ! So no data will be shown
          this.loadedSignal = true;
        },
        err => console.log(err)
      )
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
