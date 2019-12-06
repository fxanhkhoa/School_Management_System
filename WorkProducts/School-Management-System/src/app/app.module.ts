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

/* define Route */
const appRoutes: Routes = [
  {
    path: '',
    redirectTo: '/',
    pathMatch: 'full'
  }
  {path: '**', component: PageNotFoundComponent}
];

@NgModule({
  declarations: [
    AppComponent,
    PageNotFoundComponent
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
