import { Component } from '@angular/core';
import { AuthService } from './utils/services/auth.service';
import { Router, NavigationStart } from '@angular/router';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'School-Management-System';
  subscription: Subscription;

  constructor(private _authService: AuthService,
              private router: Router){
                
    /** Event: Browser reload page */
    this.subscription = router.events.subscribe((event) => {
      if (event instanceof NavigationStart) {
        let browserRefresh = !router.navigated;
        if (_authService.loggedIn()){
          let email = sessionStorage.getItem('email')
          _authService.reloaded(email)
            .subscribe(
              res =>{
                /** Set role for static variable role */
                _authService.setRole(res.role);
              },
              err =>{
                /** Do Nothing */
              }
            )
        }
      }
    });
  }
}
