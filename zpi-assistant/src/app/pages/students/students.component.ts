import { HttpErrorResponse } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { StudentSchema } from 'src/app/data/schema/student';
import { AuthService } from 'src/app/data/services/auth.service';
import { StudentsService } from 'src/app/data/services/students.service';
import { AccountTypes } from 'src/app/shared/logic/account-types';

@Component({
  selector: 'app-students',
  templateUrl: './students.component.html',
  styleUrls: ['./students.component.scss'],
})
export class StudentsComponent implements OnInit {
  fieldsUsedInFilter: string[] = ['name', 'surname', 'index'];
  filteredStudents: StudentSchema[] = [];
  students: StudentSchema[] = [];
  dataReady = false;
  httpError: { statusCode: number; msg: string };
  displayedFieldsInList = ['name', 'surname', 'index'];

  constructor(private studentsService: StudentsService, private authService: AuthService) {}

  ngOnInit(): void {
    this.fetchStudents();
  }

  private fetchStudents(): void {
    this.studentsService.getStudents().subscribe(
      (data: StudentSchema[]) => {
        this.students = data;
        this.filteredStudents = this.students;
        this.dataReady = true;
      },
      (e: HttpErrorResponse) =>
        (this.httpError = {
          statusCode: e.status,
          msg: 'Students fetching error: ' + e.statusText,
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
