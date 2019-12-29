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
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  /** Initialize Form Login Group and FormControl inside */
  loginGroup = this._formBuilder.group({
    email: new FormControl('',[
      Validators.required,
      Validators.email
    ]),
    password: new FormControl('', [
      Validators.required
    ]),
  });
  
  loginUserData = {}
  constructor(private _auth: AuthService,
              private _router: Router,
              public _formBuilder: FormBuilder) {}

  ngOnInit() {
  }

  loginUser(){
    this.loginUserData = {
      "email": this.loginGroup.get('email').value,
      "password": this.loginGroup.get('password').value
    }
    this._auth.loginUser(this.loginUserData)
      .subscribe(
        res => {
          // console.log(res)
          sessionStorage.setItem('token', res.token)
          // localStorage.setItem('currentUser', JSON.stringify(res))
          this._auth.setRole(res.role)
          this._router.navigate(['/home'])
        },
        err => console.log(err)
      )
  }

}