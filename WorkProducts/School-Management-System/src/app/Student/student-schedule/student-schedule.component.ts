import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from '../../utils/services/auth.service';

@Component({
  selector: 'app-student-schedule',
  templateUrl: './student-schedule.component.html',
  styleUrls: ['./student-schedule.component.css']
})
export class StudentScheduleComponent implements OnInit {

  constructor(private _router: Router,
              private _auth: AuthService) { }

  /**
   * TODO: Check role before use
   * * Algorithm:
   * * If role is not admin or student then back to login
   */
  ngOnInit() {
    
    if ((!this._auth.isAdmin()) && (!this._auth.isStudent())){
      this._router.navigate(['/login']);
    } else {
      /** Do nothing */
    }
  }

}
