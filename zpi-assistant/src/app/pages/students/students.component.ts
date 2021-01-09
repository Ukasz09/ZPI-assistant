import { HttpErrorResponse } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { StudentSchema } from 'src/app/data/schema/student';
import { StudentsService } from 'src/app/data/services/students.service';

@Component({
  selector: 'app-students',
  templateUrl: './students.component.html',
  styleUrls: ['./students.component.scss'],
})
export class StudentsComponent implements OnInit {
  fieldsUsedInFilter: string[] = ['name', 'surname', 'indexNumber'];
  filteredStudents: StudentSchema[] = [];
  students: StudentSchema[] = [];
  dataReady = false;
  httpError: { statusCode: number; msg: string };
  displayedFieldsInList = ['name', 'surname', 'indexNumber'];

  constructor(private studentsService: StudentsService) {}

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
}
