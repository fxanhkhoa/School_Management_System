import { Component, OnInit } from '@angular/core';
import { Course } from 'event-progress';

@Component({
  selector: 'app-student-progress',
  templateUrl: './student-progress.component.html',
  styleUrls: ['./student-progress.component.css']
})
export class StudentProgressComponent implements OnInit {

  dayOfWeek = [
    'sunday',
    'monday',
    'tuesday',
    'wednesday',
    'thursday',
    'friday',
    'saturday',
  ];

  constructor() { }

  ngOnInit() {
    let temp = new Course();

    temp.courseid = "aaa";
    temp.startday = new Date(2020, 1, 1, 0, 0, 0, 0);
    temp.endday = new Date(2020, 2, 1, 0, 0, 0, 0);

    temp.frequency = ['monday', 'wednesday', 'friday'];

    let retArr = temp.getNumberOfDayInCourse();
    console.log(retArr.length);
    console.log(retArr);
  }

}
