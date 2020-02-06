import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from '../../utils/services/auth.service';
import { EventService } from 'src/app/utils/services/event.service';
import { CalendarTypeDay, CalendarTypeMonth, Event } from 'calendar-scheduler';
import { Course } from 'event-progress';

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
    // console.log(sessionStorage.getItem('role'));
    if ((!this._auth.isAdmin()) && (!this._auth.isStudent())){
      this._router.navigate(['/login']);
    } else {
      /** Do nothing */
    }

    // TODO: Initialize all variables to empty
    this._calendarTypeMonth.events = [];
    this._calendarTypeDay.events = [];

    // TODO: Set month and year
    var d = new Date();
    this._calendarTypeMonth.selectedMonth = d.getMonth() + 1; // ! Month is from 0 - 11
    this._calendarTypeMonth.selectedYear = d.getFullYear();
    // TODO: Get all events
    this.getEvents();
  }


  async getEvents(){
    let email = sessionStorage.getItem('email')

    // TODO: Call get all courses of user API
    this._eventService.getCoursesOfUser({email})
      .subscribe(
        res => {
          for (let i = 0; i < res.length; i ++){
            let newCourse = new Course();
            
            newCourse.courseid = res[i].courseid;
            newCourse.name = res[i].name;
            newCourse.startday = new Date(res[i].startday);
            newCourse.endday = new Date(res[i].endday);
            newCourse.starttime = res[i].starttime;
            newCourse.endtime = res[i].endtime;
            newCourse.frequency = res[i].frequency;

            var eventDaysArray = [];
            eventDaysArray = newCourse.getAllDayOfCourse();
            
            for (var j = 0; j < eventDaysArray.length; j++){

              let newEvent = new Event();
              newEvent.startdate = new Date(eventDaysArray[j]);
              newEvent.enddate = new Date(eventDaysArray[j]);
              newEvent.name = newCourse.name;
              newEvent.note = "Course ID: " + newCourse.courseid;
              newEvent.priority = "Medium";
              newEvent.progress = "None";
              newEvent.evendID = newCourse.courseid;
              
              // TODO: Set time
              var array = [];
              array = newCourse.starttime.split(":");
              newEvent.startdate.setHours(array[0]);
              newEvent.startdate.setMinutes(array[1]);

              var arrayEnd = [];
              arrayEnd = newCourse.endtime.split(":");
              newEvent.enddate.setHours(arrayEnd[0]);
              newEvent.enddate.setMinutes(arrayEnd[1]); 

              // TODO: Push to events list
              this._calendarTypeMonth.events.push(newEvent);
            }
          }
        },
        err =>{
          console.log(err);
        }
      )

    // TODO: Call get all events of user API
    this._eventService.getEventsOfUser({email})
      .subscribe(
        res => {
          // TODO: Check if res is empty then exit
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
   * @param event: is the day clicked 
   */
  DayDetailView(eventDay){
    console.log(eventDay);
    // TODO: Clear events in calendar type day
    this._calendarTypeDay.events = [];
    // TODO: Set information for calendar type day
    this._calendarTypeDay.selectedDay = eventDay;
    // TODO: Get events of eventDay
    for (let i = 0; i < this._calendarTypeMonth.events.length; i++){
      if (this._calendarTypeMonth.events[i].containDay(eventDay)){
        this._calendarTypeDay.events.push(this._calendarTypeMonth.events[i]);
      }
    }

    // TODO: Set to day view mode
    this._calendarType = 'CalendarTypeDay';
  }
}
