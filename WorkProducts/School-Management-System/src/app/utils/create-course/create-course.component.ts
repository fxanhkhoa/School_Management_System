import { Component, OnInit, ElementRef, ViewChild } from '@angular/core';
import { FormBuilder, FormControl, Validators, FormGroupDirective, NgForm } from '@angular/forms';
import { ErrorStateMatcher, MatAutocomplete, MatChipInputEvent, MatAutocompleteSelectedEvent, MatSnackBar } from '@angular/material';
import {COMMA, ENTER} from '@angular/cdk/keycodes';
import { Observable } from 'rxjs';
import { EventService } from '../services/event.service';
import {map, startWith} from 'rxjs/operators';


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

  allContact = [];

  involveUsers: any[] = [];
  separatorKeysCodes: number[] = [ENTER, COMMA];
  allUsers: any[] = [];
  filteredInvoleUsers: Observable<string[]>;

  @ViewChild('involverInput', {static: false}) involverInput: ElementRef<HTMLInputElement>;
  @ViewChild('auto', {static: false}) matAutocomplete: MatAutocomplete;

  constructor(public _formBuilder: FormBuilder,
              private _event: EventService,
              private _snackBar: MatSnackBar) { 
                this.filteredInvoleUsers = this.courseGroup.get('involver').valueChanges.pipe(
                  startWith(null),
                  map((involverInput: string | null) => involverInput ? this._filter(involverInput) : this.allUsers.slice()));
              }
  
  ngOnInit() {
    // TODO: Get all user and push to auto complete filter
    this._event.getAllUser()
      .subscribe(
        res =>{
          // console.log(res)
          res.forEach(element => {
            this.allContact.push(element);
            this.allUsers.push(element);
          });
        },
        err => console.log(err)
      )
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
    // * 7 checkbox for 7 day of week
    monday: new FormControl('', []),
    tuesday: new FormControl('', []),
    wednesday: new FormControl('', []),
    thursday: new FormControl('', []),
    friday: new FormControl('', []),
    saturday: new FormControl('', []),
    sunday: new FormControl('', []),
    involver: new FormControl('',[])
  })


  remove(oneInvolever: string): void {
    const index = this.involveUsers.indexOf(oneInvolever);

    if (index >= 0) {
      this.involveUsers.splice(index, 1);
    }
  }

  add(event: MatChipInputEvent): void {
    // Add element only when MatAutocomplete is not open
    // To make sure this does not conflict with OptionSelected Event
    if (!this.matAutocomplete.isOpen) {
      const input = event.input;
      const value = event.value;

      // Add our element
      if ((value || '').trim()) {
        this.involveUsers.push(value);
      }

      // Reset the input value
      if (input) {
        input.value = '';
      }

      this.courseGroup.get('involver').setValue(null);
    }
  }

  selected(event: MatAutocompleteSelectedEvent): void {
    this.involveUsers.push(event.option.value);
    this.involverInput.nativeElement.value = '';
    this.courseGroup.get('involver').setValue(null);
  }

  private _filter(value: any): string[] {
    var filterValue = null;
    try {
      filterValue = value.toLowerCase();
    } catch (error) {
    }
    return this.allUsers.filter(involverInput => involverInput.fullname.toLowerCase().indexOf(filterValue) === 0);
  }

  CreateCourse(){
    // TODO: Set involver value
    this.courseGroup.get('involver').setValue(this.involveUsers);
    console.log(this.courseGroup.value);

    this._event.createCourse(this.courseGroup.value)
      .subscribe(
        res => {
          // console.log(res);
          if (res){
            this._snackBar.open("successful", "", {
              duration: 2000,
              panelClass: ['success-snake']
            })
          }
        },
        err => {
          console.log(err);
          this._snackBar.open("fail", "", {
            duration: 2000,
            panelClass: ['fail-snake']
          })
        }
      )
  }

  
}
