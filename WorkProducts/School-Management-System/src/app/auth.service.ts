import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router'

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  
  private _registerUrl = "http://localhost:3000/api/register"
  private _loginUrl = "http://localhost:3000/api/login"
  private static role;

  constructor(private http: HttpClient,
              private _router: Router) { }

  registerUser(user){
    return this.http.post<any>(this._registerUrl, user)
  }

  loginUser(user){
    return this.http.post<any>(this._loginUrl, user)
  }

  loggedIn(){
    return !!sessionStorage.getItem('token')
  }

  setRole(role){
    AuthService.role = role
    console.log(AuthService.role)
  }

  isAdmin(){
    if (AuthService.role == "admin"){
      return true
    } else{
      return false
    }
  }

  logoutUser(){
    sessionStorage.removeItem('token')
    this._router.navigateByUrl(this._router.url)
  }

  getToken(){
    return sessionStorage.getItem('token')
  }
}
