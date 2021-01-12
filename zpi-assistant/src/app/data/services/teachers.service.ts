import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { TeacherSchema } from '../schema/teacher';

@Injectable({
  providedIn: 'root',
})
export class TeachersService {
  constructor(private http: HttpClient) {}

  getTeachers(): Observable<TeacherSchema[]> {
    // const rawSlug = '/teachers';
    // const url = environment.API_URL + rawSlug;
    const url = 'assets/mocks/teachers.json';
    return this.http.get<TeacherSchema[]>(url);
  }
}
