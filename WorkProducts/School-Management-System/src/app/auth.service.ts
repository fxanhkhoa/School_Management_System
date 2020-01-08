import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router'

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  
  private _registerUrl = "http://localhost:3000/api/register"
  private _loginUrl = "http://localhost:3000/api/login"
  private _reloadUrl = "http://localhost:3000/api/reload"
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
  }

  isAdmin(){
    if (AuthService.role == "admin"){
      return true
    } else{
      return false
    }
  }

  reloaded(email){
    return this.http.post<any>(this._reloadUrl,{email});
  }

  logoutUser(){
    sessionStorage.removeItem('token')
    AuthService.role = 'NONE';
    this._router.navigateByUrl(this._router.url)
  }

  getToken(){
    return sessionStorage.getItem('token')
  }
}
