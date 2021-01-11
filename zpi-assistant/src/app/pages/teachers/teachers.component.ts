import { HttpErrorResponse } from '@angular/common/http';
import { Component, OnInit, ViewChild } from '@angular/core';
import { Subject } from 'rxjs';
import { TeacherSchema } from 'src/app/data/schema/teacher';
import { AuthService } from 'src/app/data/services/auth.service';
import { TeachersService } from 'src/app/data/services/teachers.service';
import { AccountTypes } from 'src/app/shared/logic/account-types';

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

  constructor(private teachersService: TeachersService, private authService: AuthService) {}

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

  get addBtnVisible(): boolean {
    return this.authService.userIsLogged && this.userIsStudent;
  }

  get msgBtnVisible(): boolean {
    return this.authService.userIsLogged;
  }

  private get userIsStudent(): boolean {
    return this.authService.userAccountType === AccountTypes.STUDENT;
  }
}
