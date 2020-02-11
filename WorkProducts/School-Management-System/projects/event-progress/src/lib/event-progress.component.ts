import { Component, OnInit, Input } from '@angular/core';
import { Course } from './model/course';
import { trigger, state, style, transition, animate } from '@angular/animations';

@Component({
  selector: 'fx-EventProgress',
  templateUrl: 'event-progress.component.html',
  styleUrls: ['event-progress.component.css'],
  animations: [
    trigger('detailExpand', [
      state('collapsed', style({height: '0px', minHeight: '0'})),
      state('expanded', style({height: '*'})),
      transition('expanded <=> collapsed', animate('225ms cubic-bezier(0.4, 0.0, 0.2, 1)')),
    ]),
  ],
})
export class EventProgressComponent implements OnInit {


  /**
   * * All input for binding
   * ! Take care when change the name,
   * ! it may conflict to other parts
   */

  @Input() course: Course;

  /**
   * * Variables for data binding
   */
  completedPercent;
  dataSource = this.course;

  columnsToDisplay = ['fullname', 'email'];
  expandedElement: Course | null;

  loaded = false;

  constructor() { }

  ngOnInit() {
    this.completedPercent = this.course.getCompletedPercent();
    // console.log(this.course);
    // console.log(this.course.involvers);

    this.course.involvers.forEach(function(item, index, array){
      console.log('one');
      console.log(element);
    })

    this.loaded = true;
  }

}
