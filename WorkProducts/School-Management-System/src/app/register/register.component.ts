import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from '../auth.service';
import { FormControl, NgForm, Validator, FormGroupDirective, Validators, FormBuilder, FormGroup } from '@angular/forms';
import { ErrorStateMatcher } from '@angular/material/core';

/** Error when invalid control is dirty, touched, or submitted. */
export class MyErrorStateMatcher implements ErrorStateMatcher {
  isErrorState(control: FormControl | null, form: FormGroupDirective | NgForm | null): boolean {
    const isSubmitted = form && form.submitted;
    return !!(control && control.invalid && (control.dirty || control.touched || isSubmitted));
  }
}

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit {
  registerUserData = {}
  genders: string[] = ['Male', 'Female', 'Other'];
  startDate = new Date(1980, 0, 1);

  /** Initialize Form Login Group and FormControl inside */
  registerGroup = this._formBuilder.group({
    email: new FormControl('',[
      Validators.required,
      Validators.email
    ]),
    fullname: new FormControl('',[
      Validators.required
    ]),
    sex: new FormControl('Male'),
    date_of_birth: new FormControl('', Validators.required)
  });

  constructor(private _auth: AuthService,
              private _router: Router,
              public _formBuilder: FormBuilder) { }

  ngOnInit() {
  }

  registerUser(){
    console.log(this.registerGroup)
    // this._auth.registerUser(this.registerUserData)
    // .subscribe(
    //   res => {
    //     console.log(res)
    //     localStorage.setItem('token', res.token)
    //     this._router.navigate(['/home'])
    //   },
    //   err => console.log(err)
    // )
  }

}
