import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { TeacherSchema } from '../schema/teacher';

@Injectable({
  providedIn: 'root',
})
export class TeachersService {
  constructor(private http: HttpClient) {}

  getTeachers(): Observable<TeacherSchema[]> {
    // const URL = environment.API_URL + Slugs.TEACHERS;
    const URL = 'assets/mocks/teachers.json';
    return this.http.get<TeacherSchema[]>(URL);
  }
}
