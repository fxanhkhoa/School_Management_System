import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, Validators, FormGroupDirective, NgForm } from '@angular/forms';
import { ErrorStateMatcher } from '@angular/material';


/** Error when invalid control is dirty, touched, or submitted. */
export class MyErrorStateMatcher implements ErrorStateMatcher {
  isErrorState(control: FormControl | null, form: FormGroupDirective | NgForm | null): boolean {
    const isSubmitted = form && form.submitted;
    return !!(control && control.invalid && (control.dirty || control.touched || isSubmitted));
  }
}

@Component({
  selector: 'app-create-course',
  templateUrl: './create-course.component.html',
  styleUrls: ['./create-course.component.css']
})
export class CreateCourseComponent implements OnInit {

  constructor(public _formBuilder: FormBuilder) { }

  ngOnInit() {
  }

  courseGroup = this._formBuilder.group({
    courseid: new FormControl('',[
      Validators.required
    ]),
    coursename: new FormControl('',[]),
    startday: new FormControl('',[
      Validators.required
    ]),
    endday: new FormControl('',[
      Validators.required
    ]),
    frequency: new FormControl('',[
      Validators.required
    ]),
    involvers: new FormControl('',[])
  })

}
