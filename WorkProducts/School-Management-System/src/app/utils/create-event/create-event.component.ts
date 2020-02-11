import { Component, OnInit, ViewChild, ElementRef } from '@angular/core';
import {COMMA, ENTER} from '@angular/cdk/keycodes';
import { FormBuilder, FormControl, Validators, FormGroupDirective, NgForm } from '@angular/forms';
import { ErrorStateMatcher, MatAutocomplete, MatChipInputEvent, MatAutocompleteSelectedEvent } from '@angular/material';
import { MatSnackBar } from '@angular/material';
import { Observable } from 'rxjs';
import {map, startWith} from 'rxjs/operators';
import { EventService } from '../services/event.service';

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

  allContact = [];

  involveUsers: any[] = [];
  separatorKeysCodes: number[] = [ENTER, COMMA];
  allUsers: any[] = [];
  filteredInvoleUsers: Observable<string[]>;

  @ViewChild('involverInput', {static: false}) involverInput: ElementRef<HTMLInputElement>;
  @ViewChild('auto', {static: false}) matAutocomplete: MatAutocomplete;

  constructor(public _formBuilder: FormBuilder,
              private _snackBar: MatSnackBar,
              private _event: EventService) {
    this.filteredInvoleUsers = this.createEventGroup.get('involver').valueChanges.pipe(
      startWith(null),
      map((involverInput: string | null) => involverInput ? this._filter(involverInput) : this.allUsers.slice()));
  }

  ngOnInit() {
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
    type: new FormControl('',[]),
    location: new FormControl('', [
      Validators.required
    ]),
    involver: new FormControl('',[])
  });

  CreateEvent(){
    // TODO: Set involvers
    // console.log(this.involveUsers);
    this.createEventGroup.get('involver').setValue(this.involveUsers);
    // TODO: Set time to datetime
    // TODO: Set startDate
    var array = this.createEventGroup.value.startTime.split(":");
    var d = new Date(this.createEventGroup.value.startDate);
    d.setHours(array[0]);
    d.setMinutes(array[1]);
    this.createEventGroup.value.startDate = d.toString();

    // TODO: Set endDate
    array = this.createEventGroup.value.endTime.split(":");
    d = new Date(this.createEventGroup.value.endDate);
    d.setHours(array[0]);
    d.setMinutes(array[1]);
    this.createEventGroup.value.endDate = d.toString();
    // console.log(this.createEventGroup.value);
    this._event.createEvent(this.createEventGroup.value)
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
          // console.log(err)
          this._snackBar.open("fail", "", {
            duration: 2000,
            panelClass: ['fail-snake']
          })
        }
      )
  }

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

      this.createEventGroup.get('involver').setValue(null);
    }
  }

  selected(event: MatAutocompleteSelectedEvent): void {
    this.involveUsers.push(event.option.value);
    this.involverInput.nativeElement.value = '';
    this.createEventGroup.get('involver').setValue(null);
  }

  private _filter(value: any): string[] {
    var filterValue = null;
    try {
      filterValue = value.toLowerCase();
    } catch (error) {
    }
    return this.allUsers.filter(involverInput => involverInput.fullname.toLowerCase().indexOf(filterValue) === 0);
  }

  getLowerCase(value: any){
    
  }
}
