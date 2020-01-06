import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class EventService {

  private _dashboardUrl = "http://localhost:3000/api/dashboard"
  private _createEventUrl = "http://localhost:3000/api/create-event"

  constructor(private http: HttpClient) { }

  getDashboard(){
    return this.http.get<any>(this._dashboardUrl)
  }

  createEvent(event){
    return this.http.post<any>(this._createEventUrl, event);
  }
}
