import { Component, OnInit } from '@angular/core';
import { EventService } from '../services/event.service';
import { HttpErrorResponse } from '@angular/common/http';
import { Router } from '@angular/router';

/** Calendar Model */
import { Event, CalendarTypeDay, CalendarTypeMonth } from 'calendar-scheduler';
import { Course } from 'event-progress';
import { trigger, state, style, transition, animate } from '@angular/animations';

export interface Tile {
  color: string;
  cols: number;
  rows: number;
  text: string;
}

export interface PeriodicElement {
  name: string;
  position: number;
  weight: number;
  symbol: string;
  description: string;
}

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css'],
  animations: [
    trigger('detailExpand', [
      state('collapsed', style({height: '0px', minHeight: '0'})),
      state('expanded', style({height: '*'})),
      transition('expanded <=> collapsed', animate('225ms cubic-bezier(0.4, 0.0, 0.2, 1)')),
    ])
  ]
})
export class DashboardComponent implements OnInit {

  tiles: Tile[] = [
    {text: 'One', cols: 1, rows: 1, color: 'lightblue'},
    {text: 'Two', cols: 1, rows: 1, color: 'lightgreen'},
    {text: 'Three', cols: 1, rows: 1, color: 'lightpink'},
    {text: 'Four', cols: 1, rows: 1, color: '#DDBDF1'},
    {text: 'One', cols: 1, rows: 1, color: 'lightblue'},
    {text: 'Two', cols: 1, rows: 1, color: 'lightgreen'},
    {text: 'Three', cols: 1, rows: 1, color: 'lightpink'},
    {text: 'Four', cols: 1, rows: 1, color: '#DDBDF1'},
    {text: 'One', cols: 1, rows: 1, color: 'lightblue'},
    {text: 'Two', cols: 1, rows: 1, color: 'lightgreen'},
    {text: 'Three', cols: 1, rows: 1, color: 'lightpink'},
    {text: 'Four', cols: 1, rows: 1, color: '#DDBDF1'},
  ];

  ELEMENT_DATA: PeriodicElement[] = [
    {
      position: 1,
      name: 'Hydrogen',
      weight: 1.0079,
      symbol: 'H',
      description: `Hydrogen is a chemical element with symbol H and atomic number 1. With a standard
          atomic weight of 1.008, hydrogen is the lightest element on the periodic table.`
    }, {
      position: 2,
      name: 'Helium',
      weight: 4.0026,
      symbol: 'He',
      description: `Helium is a chemical element with symbol He and atomic number 2. It is a
          colorless, odorless, tasteless, non-toxic, inert, monatomic gas, the first in the noble gas
          group in the periodic table. Its boiling point is the lowest among all the elements.`
    }, {
      position: 3,
      name: 'Lithium',
      weight: 6.941,
      symbol: 'Li',
      description: `Lithium is a chemical element with symbol Li and atomic number 3. It is a soft,
          silvery-white alkali metal. Under standard conditions, it is the lightest metal and the
          lightest solid element.`
    }, {
      position: 4,
      name: 'Beryllium',
      weight: 9.0122,
      symbol: 'Be',
      description: `Beryllium is a chemical element with symbol Be and atomic number 4. It is a
          relatively rare element in the universe, usually occurring as a product of the spallation of
          larger atomic nuclei that have collided with cosmic rays.`
    }, {
      position: 5,
      name: 'Boron',
      weight: 10.811,
      symbol: 'B',
      description: `Boron is a chemical element with symbol B and atomic number 5. Produced entirely
          by cosmic ray spallation and supernovae and not by stellar nucleosynthesis, it is a
          low-abundance element in the Solar system and in the Earth's crust.`
    }, {
      position: 6,
      name: 'Carbon',
      weight: 12.0107,
      symbol: 'C',
      description: `Carbon is a chemical element with symbol C and atomic number 6. It is nonmetallic
          and tetravalent—making four electrons available to form covalent chemical bonds. It belongs
          to group 14 of the periodic table.`
    }, {
      position: 7,
      name: 'Nitrogen',
      weight: 14.0067,
      symbol: 'N',
      description: `Nitrogen is a chemical element with symbol N and atomic number 7. It was first
          discovered and isolated by Scottish physician Daniel Rutherford in 1772.`
    }, {
      position: 8,
      name: 'Oxygen',
      weight: 15.9994,
      symbol: 'O',
      description: `Oxygen is a chemical element with symbol O and atomic number 8. It is a member of
           the chalcogen group on the periodic table, a highly reactive nonmetal, and an oxidizing
           agent that readily forms oxides with most elements as well as with other compounds.`
    }, {
      position: 9,
      name: 'Fluorine',
      weight: 18.9984,
      symbol: 'F',
      description: `Fluorine is a chemical element with symbol F and atomic number 9. It is the
          lightest halogen and exists as a highly toxic pale yellow diatomic gas at standard
          conditions.`
    }, {
      position: 10,
      name: 'Neon',
      weight: 20.1797,
      symbol: 'Ne',
      description: `Neon is a chemical element with symbol Ne and atomic number 10. It is a noble gas.
          Neon is a colorless, odorless, inert monatomic gas under standard conditions, with about
          two-thirds the density of air.`
    },
  ];

  dataSource = this.ELEMENT_DATA;
  columnsToDisplay = ['name', 'weight', 'symbol', 'position'];
  expandedElement: PeriodicElement | null;

  data = []

  allDay = new Date(2020, 2, 0).getDate();

  _event = new Event();
  _calendarTypeDay = new CalendarTypeDay();
  _calendarType = 'CalendarTypeMonth';
  _calendarTypeMonth = new CalendarTypeMonth();

  _course = new Course();

  constructor(private _eventService: EventService,
              private _router: Router) { }

  ngOnInit() {
    this._eventService.getDashboard()
      .subscribe(
        res => this.data = res,
        err => {
          if (err instanceof HttpErrorResponse){
            if (err.status === 401){
              this._router.navigate(['/login'])
            }
          }
        }
      )
    
    this._event.startdate = new Date("January 3, 2020");
    this._event.enddate = new Date("January 5, 2020");
    this._event.name = "1st event";
    this._event.content = "Meeting at 3rd floor";
    this._event.note = "Bring book, notebook";
    this._event.progress = "On Going";
    this._event.priority = "High";
    this._event.type = "Meeting";
    this._event.location = "Room 301 Floor 3rd";
    console.log(this._event.containDay(new Date("January 3, 2020")));


    this._calendarTypeDay.selectedDay = new Date("January 3, 2020");
    this._calendarTypeDay.events.push(this._event);
    this._calendarTypeDay.events.push(this._event);

    this._calendarTypeMonth.selectedMonth = 1; // February
    this._calendarTypeMonth.selectedYear = 2020;
    this._calendarTypeMonth.events.push(this._event);
    this._calendarTypeMonth.events.push(this._event);

    this._event = new Event();
    this._event.startdate = new Date("January 3, 2020");
    this._event.enddate = new Date("January 3, 2020");
    this._event.name = "2st event";
    this._event.content = "Meeting at 3rd floor";

    this._calendarTypeMonth.events.push(this._event);
    this._calendarTypeMonth.events.push(this._event);

    console.log(this._calendarTypeMonth.events);

    // this._eventService.createEvent(this._event)
    //     .subscribe(
    //       res => console.log(res),
    //       err => console.log(err)
    //     )

    this._course.courseid = "aaa";
    this._course.name = "BBB";
    
    console.log(this.ELEMENT_DATA);
  }

  DayDetailView(event){
    console.log(event);
  }
}


/** Class CalendarScheduler */
export class CalendarSchedulerClass{

}
