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
    const rawSlug = '/teachers';
    const url = environment.API_URL + rawSlug;
    return this.http.get<TeacherSchema[]>(url);
  }

  getTeacher(email: string): Observable<TeacherSchema> {
    const rawSlug = '/teachers/{email}/';
    const slug = rawSlug.replace('{email}', email);
    const url = environment.API_URL + slug;
    return this.http.get<TeacherSchema>(url);
  }
}
