import { Component, OnInit } from '@angular/core';
import { Course } from 'event-progress';
import { AuthService } from 'src/app/utils/services/auth.service';
import { Router } from '@angular/router';
import { EventService } from 'src/app/utils/services/event.service';

@Component({
  selector: 'app-student-progress',
  templateUrl: './student-progress.component.html',
  styleUrls: ['./student-progress.component.css']
})
export class StudentProgressComponent implements OnInit {

  temp = new Course();
  dayOfWeek = [
    'sunday',
    'monday',
    'tuesday',
    'wednesday',
    'thursday',
    'friday',
    'saturday',
  ];

  listCourses: Course[] = [];

  loaded = false;

  constructor(private _auth: AuthService,
              private _router: Router,
              private _eventService: EventService) { }

  /**
   * TODO: Check role before use
   * TODO: Get all courses of user
   * * Algorithm:
   * * If role is not admin or student then back to login
   */
  ngOnInit() {

    if ((!this._auth.isAdmin()) && (!this._auth.isStudent())){
      this._router.navigate(['/login']);
    } else {
      /** Do nothing */
    }

    this.getCourses();   
  }

  async getCourses(){
    let email = sessionStorage.getItem('email')

    // TODO: Get Courses
    this._eventService.getCoursesOfUser({email})
      .subscribe(
        res =>{
          console.log(res);
          for (let i = 0; i < res.length; i++){
            let newCourse = new Course();
            
            newCourse.courseid = res[i].courseid;
            newCourse.name = res[i].name;
            newCourse.startday = new Date(res[i].startday);
            newCourse.endday = new Date(res[i].endday);
            newCourse.starttime = res[i].starttime;
            newCourse.endtime = res[i].endtime;
            newCourse.frequency = res[i].frequency;

            this.listCourses.push(newCourse);
          }
          // TODO: Signal to load UI
          // ! Need to do here because this is asynchronous thread
          // ! if no signal it will load first then get API data later
          // ! So no data will be shown
          this.loaded = true;
        },
        err => {
          console.log(err);
        }
      )
  }

}
