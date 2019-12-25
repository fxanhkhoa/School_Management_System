/* BrowserModule */
import { BrowserModule } from '@angular/platform-browser';
/* NgModule */
import { NgModule } from '@angular/core';
/* Mat Slider */
import { MatSliderModule } from '@angular/material/slider';
/* Router */
import {RouterModule, Routes} from '@angular/router';
/* Form Module */
import {FormsModule} from '@angular/forms';
/* HttpClient Module*/
import {HttpClientModule, HTTP_INTERCEPTORS} from '@angular/common/http'

/* App component */
import { AppComponent } from './app.component';
/* Browser Animations */
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
/* Component */
import { PageNotFoundComponent } from './page-not-found/page-not-found.component';
import { HomeComponent } from './home/home.component';
import { RegisterComponent } from './register/register.component';
import { LoginComponent } from './login/login.component';
import { DashboardComponent } from './dashboard/dashboard.component';
/* Auth Service */
import { AuthService } from './auth.service';
import { AuthGuard } from './auth.guard';
/* Event Service */
import { EventService }  from './event.service';
/* Token Interceptor */
import { TokenInterceptorService } from './token-interceptor.service'

/* define Route */
const appRoutes: Routes = [
  { path: 'home', component: HomeComponent },
  { path: 'login', component: LoginComponent },
  { path: 'register', component: RegisterComponent },
  { path: 'dashboard', component: DashboardComponent, canActivate: [AuthGuard]},
  {
    path: '',
    redirectTo: '/home',
    pathMatch: 'full'
  },
  {path: '**', component: PageNotFoundComponent}
];

@NgModule({
  declarations: [
    AppComponent,
    PageNotFoundComponent,
    HomeComponent,
    RegisterComponent,
    LoginComponent,
    DashboardComponent
  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    MatSliderModule,
    RouterModule.forRoot(
      appRoutes
    ),
    FormsModule,
    HttpClientModule
  ],
  providers: [AuthService, AuthGuard, EventService,
  {
    provide: HTTP_INTERCEPTORS,
    useClass: TokenInterceptorService,
    multi: true
  }],
  bootstrap: [AppComponent]
})
export class AppModule { }
