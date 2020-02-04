import { Component, OnInit, Input } from '@angular/core';
import { Course } from './model/course';

@Component({
  selector: 'fx-EventProgress',
  templateUrl: 'event-progress.component.html',
  styles: ['event-progress.component.css']
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

  constructor() { }

  ngOnInit() {
    this.completedPercent = this.course.getCompletedPercent();
  }

}
