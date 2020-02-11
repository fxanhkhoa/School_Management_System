import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class EventService {

  private _dashboardUrl = "http://localhost:3000/api/dashboard"

  // *EVENT
  private _createEventUrl = "http://localhost:3000/api/create-event"
  private _getEventsOfUser = "http://localhost:3000/api/get-events-of-user"

  // *USER
  private _getUsers = "http://localhost:3000/api/get-users"
  private _getUserInfo = "http://localhost:3000/api/get-user-info"
  
  // *COURSE
  private _createCourseUrl = "http://localhost:3000/api/create-course"
  private _getCoursesOfUser = "http://localhost:3000/api/get-courses-of-user"

  constructor(private http: HttpClient) { }

  getDashboard(){
    return this.http.get<any>(this._dashboardUrl)
  }

  // * EVENT
  createEvent(event){
    return this.http.post<any>(this._createEventUrl, event);
  }

  getEventsOfUser(email){
    return this.http.post<any>(this._getEventsOfUser, email);
  }

  // * USER
  getAllUser(){
    return this.http.get<any>(this._getUsers);
  }

  getUserInfo(email){
    return this.http.post<any>(this._getUserInfo, email);
  }

  // * COURSE
  createCourse(course){
    return this.http.post<any>(this._createCourseUrl, course);
  }

  getCoursesOfUser(email){
    return this.http.post<any>(this._getCoursesOfUser, email);
  }
}
