import { Component, OnInit } from '@angular/core';
import { AuthService } from 'src/app/utils/services/auth.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-teacher-progress',
  templateUrl: './teacher-progress.component.html',
  styleUrls: ['./teacher-progress.component.css']
})
export class TeacherProgressComponent implements OnInit {

  constructor(private _auth: AuthService,
              private _router: Router) { }

  /**
   * TODO: Check role is 'admin' or 'teacher'
   */
  ngOnInit() {
    if ((!this._auth.isAdmin()) && (!this._auth.isTeacher())){
      this._router.navigate(['/login']);
    } else {
      /** Do nothing */
    }
  }

}
