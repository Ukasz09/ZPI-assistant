import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { StudentSchema } from '../schema/student';

@Injectable({
  providedIn: 'root',
})
export class StudentsService {
  constructor(private http: HttpClient) {}

  getStudents(): Observable<StudentSchema[]> {
    // const URL = environment.API_URL + Slugs.STUDENTS;
    const URL = 'assets/mocks/students.json';
    return this.http.get<StudentSchema[]>(URL);
  }
}
