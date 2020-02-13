/* BrowserModule */
import { BrowserModule } from '@angular/platform-browser';
import { CommonModule, registerLocaleData } from '@angular/common';
/* NgModule */
import { NgModule, LOCALE_ID } from '@angular/core';
/* Angular Material */
import { MatSliderModule } from '@angular/material/slider';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/';
import { MatToolbarModule, MatIconModule, MatSidenavModule, MatListModule, MatButtonModule, MatMenuModule } from '@angular/material';
import { MatRadioModule, MatDatepickerModule, MatNativeDateModule, MAT_DATE_LOCALE } from '@angular/material';
import { MatStepperModule, MatAutocompleteModule, MatSelectModule, MatGridListModule } from '@angular/material';
import { MatCardModule, MatExpansionModule, MatTooltipModule, MatButtonToggleModule } from '@angular/material';
import { MatChipsModule, MatCheckboxModule, MatSnackBarModule, MatTableModule } from '@angular/material';

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
import { PageNotFoundComponent } from './utils/page-not-found/page-not-found.component';
import { HomeComponent } from './utils/home/home.component';
import { RegisterComponent } from './utils/register/register.component';
import { LoginComponent } from './utils/login/login.component';
import { DashboardComponent } from './utils/dashboard/dashboard.component';
/* Auth Service */
import { AuthService } from './utils/services/auth.service';
import { AuthGuard } from './utils/services/auth.guard';
/* Event Service */
import { EventService }  from './utils/services/event.service';
/* Token Interceptor */
import { TokenInterceptorService } from './utils/services/token-interceptor.service';
import { AddStudentComponent } from './add-student/add-student.component';

/**
 * * Util import
 */
import { CreateEventComponent } from './utils/create-event/create-event.component';


/* Library */
import { CalendarSchedulerModule } from 'calendar-scheduler';
import { EventProgressModule } from 'event-progress';
/** Student Schedule Component */
import { StudentScheduleComponent } from './Student/student-schedule/student-schedule.component';
import { StudentProgressComponent } from './Student/student-progress/student-progress.component';
import { CreateCourseComponent } from './utils/create-course/create-course.component';
import { TeacherProgressComponent } from './teacher/teacher-progress/teacher-progress.component';
import { TeacherScheduleComponent } from './teacher/teacher-schedule/teacher-schedule.component';

/** Locale */
import localeVi from '@angular/common/locales/vi';

registerLocaleData(localeVi, 'vi')

/* define Route */
const appRoutes: Routes = [
  // * Util link
  { path: 'home', component: HomeComponent },
  { path: 'login', component: LoginComponent },
  { path: 'register-user', component: RegisterComponent, canActivate: [AuthGuard]},
  { path: 'add-student', component: AddStudentComponent, canActivate: [AuthGuard]},
  { path: 'dashboard', component: DashboardComponent, canActivate: [AuthGuard]},
  { path: 'create-event', component: CreateEventComponent, canActivate: [AuthGuard]},
  { path: 'create-course', component: CreateCourseComponent, canActivate: [AuthGuard]},
  // * Student link
  { path: 'student-schedule', component: StudentScheduleComponent, canActivate: [AuthGuard]},
  { path: 'student-progress', component: StudentProgressComponent, canActivate: [AuthGuard]},
  // * Teacher link
  { path: 'teacher-schedule', component: TeacherScheduleComponent, canActivate: [AuthGuard]},
  { path: 'teacher-progress', component: TeacherProgressComponent, canActivate: [AuthGuard]},
  // * Default link
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
    StudentScheduleComponent,
    CreateEventComponent,
    StudentProgressComponent,
    CreateCourseComponent,
    TeacherProgressComponent,
    TeacherScheduleComponent,
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
    ReactiveFormsModule,
    // * Angular material Modules
    MatInputModule,
    MatFormFieldModule,
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
    MatGridListModule,
    MatCardModule,
    MatExpansionModule,
    MatTooltipModule,
    MatButtonToggleModule,
    MatChipsModule,
    MatCheckboxModule,
    MatSnackBarModule,
    MatTableModule,
    
    // * Owned Library Module
    CalendarSchedulerModule,
    EventProgressModule
  ],
  providers: [AuthService, AuthGuard, EventService,
  {
    provide: HTTP_INTERCEPTORS,
    useClass: TokenInterceptorService,
    multi: true
  },
  {provide: MAT_DATE_LOCALE, useValue: 'en-US'}
  ],
  bootstrap: [AppComponent],
})
export class AppModule { }
