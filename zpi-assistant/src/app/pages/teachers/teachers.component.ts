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
  private _searchFilter = '';
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

  get searchFilter(): string {
    return this._searchFilter;
  }

  set searchFilter(value: string) {
    this._searchFilter = value;
    if (this.searchFilter) {
      this.filteredTeachers = this.performFilter(this.searchFilter);
    } else {
      this.filteredTeachers = this.teachers;
    }
  }

  private performFilter(filterBy: string): TeacherSchema[] {
    filterBy = filterBy.toLowerCase();
    return this.teachers.filter((teacher: TeacherSchema) => this.isInFilter(filterBy, teacher));
  }

  private isInFilter(filterBy: string, teacher: TeacherSchema): boolean {
    const phrases = filterBy.split(/[ ,]+/);
    for (const p of phrases) {
      if (p) {
        let contain = false;
        for (const field of this.fieldsUsedInFilter) {
          if (teacher[field].toLowerCase().indexOf(p) !== -1) {
            contain = true;
          }
        }
        if (contain === false) {
          return false;
        }
      }
    }
    return true;
  }
}
