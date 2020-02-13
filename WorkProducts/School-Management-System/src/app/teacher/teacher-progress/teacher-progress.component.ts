import { Component, OnInit, AfterViewInit } from '@angular/core';
import { AuthService } from 'src/app/utils/services/auth.service';
import { Router } from '@angular/router';
import { Course, User } from 'event-progress';
import { EventService } from 'src/app/utils/services/event.service';
import { BehaviorSubject } from 'rxjs';

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

  public listCourses: Course[] = [];
  public listInvolvers: any[] = [];

  loaded = false;
  loadedInvolver = false;
  filtersLoaded: Promise<boolean>;


  dataAfterSubcribe: BehaviorSubject<any[]> = new BehaviorSubject<any>(null);

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


  getCourses(){
    let email = sessionStorage.getItem('email')

    // TODO: Get Courses
    this._eventService.getCoursesOfUser({email})
      .subscribe(
        res =>{
          console.log(res);
          for (let i = 0; i < res.coursesArray.length; i++){
            let newCourse = new Course();
            
            newCourse.courseid = res.coursesArray[i].courseid;
            newCourse.name = res.coursesArray[i].name;
            newCourse.startday = new Date(res.coursesArray[i].startday);
            newCourse.endday = new Date(res.coursesArray[i].endday);
            newCourse.starttime = res.coursesArray[i].starttime;
            newCourse.endtime = res.coursesArray[i].endtime;
            newCourse.frequency = res.coursesArray[i].frequency;

            console.log(newCourse.startday.getTimezoneOffset().toString())

            this.listCourses.push(newCourse);
          }

          for (let i = 0; i < res.listInvolversInfo.length; i++){
            this.listInvolvers.push(res.listInvolversInfo[i]);
          }
          
          // TODO: Signal to load UI
          // ! Need to do here because this is asynchronous thread
          // ! if no signal it will load first then get API data later
          // ! So no data will be shown
          this.filtersLoaded = Promise.resolve(true);
          console.log(this.listInvolvers, this.listCourses);
        },
        err => {
          console.log(err);
        },
        () => { // *Complete part

        }
      )
  }

  pushUserInfoToCourse(){
    for (let i = 0; i < this.listCourses.length; i++){
      this._eventService.getListUserInfo(this.listCourses[i].involvers)
        .subscribe(
          res =>{

          },
          err => console.log(err)
        )
    }
  }

  /**
   * TODO: Get Info of All involvers in listInvolver
   * @param listInvovler 
   */
  getInvolvers(listInvovler){
    console.log(listInvovler)
    let involversInfo = [];
    let done = false;
    for (let j = 0; j < listInvovler.length; j++){
      this._eventService.getUserInfo({email: listInvovler[j]})
        .subscribe(
          res =>{
            // console.log(res)
            involversInfo.push(res);
          },
          err => console.log(err),
          () => {return involversInfo; }
        )
      done = true;
    }
    while (!done) {};
    return involversInfo;
  }
}
