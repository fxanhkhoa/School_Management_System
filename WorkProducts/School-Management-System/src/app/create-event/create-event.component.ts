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
  selector: 'app-create-event',
  templateUrl: './create-event.component.html',
  styleUrls: ['./create-event.component.css']
})

export class CreateEventComponent implements OnInit {

  constructor(public _formBuilder: FormBuilder) { }

  ngOnInit() {
  }

  priorityValue: String[] = ['Low', "Normal", "High"];

  createEventGroup = this._formBuilder.group({
    startDate: new FormControl('',[
      Validators.required
    ]),
    startTime: new FormControl('',[
      Validators.required
    ]),
    endDate: new FormControl('',[
      Validators.required
    ]),
    endTime: new FormControl('',[
      Validators.required
    ]),
    name: new FormControl('',[
      Validators.required
    ]),
    content: new FormControl('',[]),
    note: new FormControl('',[]),
    progress: new FormControl('On Going',[]),
    priority: new FormControl('Low',[]), // ! Only Low, Normal, High
    type: new FormControl('Class Schedule',[]),
    location: new FormControl('', [])
  });

}
