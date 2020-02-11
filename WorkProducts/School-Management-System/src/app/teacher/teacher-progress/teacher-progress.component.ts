import { Component, OnInit } from '@angular/core';
import { AuthService } from 'src/app/utils/services/auth.service';
import { Router } from '@angular/router';
import { Course, User } from 'event-progress';
import { EventService } from 'src/app/utils/services/event.service';

@Component({
  selector: 'app-teacher-progress',
  templateUrl: './teacher-progress.component.html',
  styleUrls: ['./teacher-progress.component.css']
})
export class TeacherProgressComponent implements OnInit {

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
  listInvovler = [];

  loaded = false;

  constructor(private _auth: AuthService,
              private _router: Router,
              private _eventService: EventService) { }

  /**
   * TODO: Check role is 'admin' or 'teacher'
   */
  ngOnInit() {
    if ((!this._auth.isAdmin()) && (!this._auth.isTeacher())){
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
          // console.log(res);
          for (let i = 0; i < res.length; i++){
            let newCourse = new Course();
            
            newCourse.courseid = res[i].courseid;
            newCourse.name = res[i].name;
            newCourse.startday = new Date(res[i].startday);
            newCourse.endday = new Date(res[i].endday);
            newCourse.starttime = res[i].starttime;
            newCourse.endtime = res[i].endtime;
            newCourse.frequency = res[i].frequency;

            // TODO: get invovler info
            for (let j = 0; j < res[i].involvers.length; j++){
              this._eventService.getUserInfo({email: res[i].involvers[j]})
                .subscribe(
                  res =>{
                    let newUser = new User()
                    newUser.email = res.email;
                    newUser.fullname = res.fullname;
                    newUser.birthday = res.birthday;
                    newUser.gender = res.gender;
                    newUser.kpi = res.kpi;
                    // console.log(res)
                      newCourse.involvers.push(newUser);
                  },
                  err => console.log(err)
                )
            }

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
