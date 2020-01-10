import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from '../auth.service';

@Component({
  selector: 'app-student-schedule',
  templateUrl: './student-schedule.component.html',
  styleUrls: ['./student-schedule.component.css']
})
export class StudentScheduleComponent implements OnInit {

  constructor(private _router: Router,
              private _auth: AuthService) { }

  ngOnInit() {
    
    if ((!this._auth.isAdmin()) && (!this._auth.isStudent())){
      this._router.navigate(['/login']);
    } else {
      /** Do nothing */
    }
  }

}
