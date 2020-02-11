import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { TeacherProgressComponent } from './teacher-progress.component';

describe('TeacherProgressComponent', () => {
  let component: TeacherProgressComponent;
  let fixture: ComponentFixture<TeacherProgressComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ TeacherProgressComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(TeacherProgressComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
