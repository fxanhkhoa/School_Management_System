/* BrowserModule */
import { BrowserModule } from '@angular/platform-browser';
/* NgModule */
import { NgModule } from '@angular/core';
/* Mat Slider */
import { MatSliderModule } from '@angular/material/slider';
/* Router */
import {RouterModule, Routes} from '@angular/router';

/* App component */
import { AppComponent } from './app.component';
/* Browser Animations */
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { PageNotFoundComponent } from './page-not-found/page-not-found.component';
import { HomeComponent } from './home/home.component';

/* define Route */
const appRoutes: Routes = [
  { path: '', component: HomeComponent },
  { path: 'companies', component: HomeComponent },
  { path: 'users', component: HomeComponent },
  {
    path: '',
    redirectTo: '/',
    pathMatch: 'full'
  },
  {path: '**', component: PageNotFoundComponent}
];

@NgModule({
  declarations: [
    AppComponent,
    PageNotFoundComponent,
    HomeComponent
  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    MatSliderModule,
    RouterModule.forRoot(
      appRoutes
    )
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
