import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from '../services/auth.service';
import { FormControl, NgForm, Validator, FormGroupDirective, Validators, FormBuilder, FormGroup } from '@angular/forms';
import { ErrorStateMatcher } from '@angular/material/core';
import { MatSnackBar } from '@angular/material';

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
  genders: string[] = ['male', 'female', 'other'];
  roleList: string[] = ['admin','teacher','student'];
  startDate = new Date(1980, 0, 1);
  typeChoosen = 'password';
  passwordViewIcon = 'visibility';

  /** Initialize Form Login Group and FormControl inside */
  registerGroup = this._formBuilder.group({
    email: new FormControl('',[
      Validators.required,
      Validators.email
    ]),
    password: new FormControl('',[
      Validators.required
    ]),
    fullname: new FormControl('',[
      Validators.required
    ]),
    gender: new FormControl('Male'),
    birthday: new FormControl('', Validators.required),
    role: new FormControl('',[
      Validators.required
    ]),
    kpi: new FormControl('',[])
  });

  constructor(private _auth: AuthService,
              private _router: Router,
              public _formBuilder: FormBuilder,
              private _snackBar: MatSnackBar) { }

  ngOnInit() {
    if (!this._auth.isAdmin()){
      this._router.navigate(['/login']);
    } else {
      // * Do nothing
    }
  }

  registerUser(){
    console.log(this.registerGroup.value)
    this._auth.registerUser(this.registerGroup.value)
    .subscribe(
      res => {
        console.log(res)
        if (res){
          this._snackBar.open("successful", "", {
            duration: 2000,
            panelClass: ['success-snake']
          })
        }
        this._router.navigate(['/login'])
      },
      err => {
        console.log(err)
        this._snackBar.open("fail", "", {
          duration: 2000,
          panelClass: ['fail-snake']
        })
      }
    )
  }

  toggleViewPass(){
    if (this.typeChoosen === 'password'){
      this.typeChoosen = 'text';
      this.passwordViewIcon = 'visibility_off';
    } else {
      this.typeChoosen = 'password';
      this.passwordViewIcon = 'visibility';
    }
  }
}
