import { HttpErrorResponse } from '@angular/common/http';
import { Component, OnInit, ViewChild } from '@angular/core';
import { Subject } from 'rxjs';
import { TeacherSchema } from 'src/app/data/schema/teacher';
import { TeachersService } from 'src/app/data/services/teachers.service';

@Component({
  selector: 'app-teachers',
  templateUrl: './teachers.component.html',
  styleUrls: ['./teachers.component.scss'],
})
export class TeachersComponent implements OnInit {
  fieldsUsedInFilter: string[] = ['name', 'surname'];
  filteredTeachers: TeacherSchema[] = [];
  teachers: TeacherSchema[] = [];
  dataReady = false;
  httpError: { statusCode: number; msg: string };
  displayedFieldsInList = ['title', 'name', 'surname'];

  constructor(private teachersService: TeachersService) {}

  ngOnInit(): void {
    this.fetchTeachers();
  }

  private fetchTeachers(): void {
    this.teachersService.getTeachers().subscribe(
      (data: TeacherSchema[]) => {
        this.teachers = data;
        this.filteredTeachers = this.teachers;
        this.dataReady = true;
      },
      (e: HttpErrorResponse) =>
        (this.httpError = {
          statusCode: e.status,
          msg: 'Lecturers fetching error: ' + e.statusText,
        })
    );
  }
}
