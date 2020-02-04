import { Component, OnInit } from '@angular/core';
import { Course } from 'event-progress';

@Component({
  selector: 'app-student-progress',
  templateUrl: './student-progress.component.html',
  styleUrls: ['./student-progress.component.css']
})
export class StudentProgressComponent implements OnInit {

  temp = new Course();
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

    this.temp.courseid = "aaa";
    this.temp.name = "TOEIC 800";
    this.temp.startday = new Date(2020, 1, 1, 0, 0, 0, 0);
    this.temp.endday = new Date(2020, 2, 1, 0, 0, 0, 0);
    this.temp.starttime = "11:11";
    this.temp.endtime = "14:22";

    this.temp.frequency = ['monday', 'wednesday', 'friday'];
  }

}
