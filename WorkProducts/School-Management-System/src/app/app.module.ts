/* BrowserModule */
import { BrowserModule } from '@angular/platform-browser';
import { CommonModule } from '@angular/common';
/* NgModule */
import { NgModule } from '@angular/core';
/* Angular Material */
import { MatSliderModule } from '@angular/material/slider';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/';
import { MatToolbarModule, MatIconModule, MatSidenavModule, MatListModule, MatButtonModule, MatMenuModule } from '@angular/material';
import { MatRadioModule, MatDatepickerModule, MatNativeDateModule, MAT_DATE_LOCALE } from '@angular/material';
import { MatStepperModule, MatAutocompleteModule, MatSelectModule, MatGridListModule } from '@angular/material';
import { MatCardModule, MatExpansionModule, MatTooltipModule } from '@angular/material';

/* Router */
import {RouterModule, Routes} from '@angular/router';
/* Form Module */
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
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
import { TokenInterceptorService } from './token-interceptor.service';
import { AddStudentComponent } from './add-student/add-student.component';

/* Library */
import { CalendarSchedulerModule } from 'calendar-scheduler';

/* define Route */
const appRoutes: Routes = [
  { path: 'home', component: HomeComponent },
  { path: 'login', component: LoginComponent },
  { path: 'register', component: RegisterComponent, canActivate: [AuthGuard]},
  { path: 'add-student', component: AddStudentComponent, canActivate: [AuthGuard]},
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
    DashboardComponent,
    AddStudentComponent,
  ],
  imports: [
    BrowserModule,
    CommonModule,
    BrowserAnimationsModule,
    MatSliderModule,
    RouterModule.forRoot(
      appRoutes
    ),
    FormsModule,
    HttpClientModule,
    MatFormFieldModule,
    MatInputModule,
    ReactiveFormsModule,
    MatToolbarModule, 
    MatIconModule, 
    MatSidenavModule, 
    MatListModule, 
    MatButtonModule,
    MatMenuModule,
    MatRadioModule,
    MatDatepickerModule,
    MatNativeDateModule,
    MatStepperModule, 
    MatAutocompleteModule,
    MatSelectModule,
    CalendarSchedulerModule,
    MatGridListModule,
    MatCardModule,
    MatExpansionModule,
    MatTooltipModule
  ],
  providers: [AuthService, AuthGuard, EventService,
  {
    provide: HTTP_INTERCEPTORS,
    useClass: TokenInterceptorService,
    multi: true
  },
  {provide: MAT_DATE_LOCALE, useValue: 'en-GB'}
  ],
  bootstrap: [AppComponent],
})
export class AppModule { }
