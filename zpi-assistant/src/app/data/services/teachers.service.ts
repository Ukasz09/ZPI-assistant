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

  /**
   * Request teachers data
   *
   * @returns An `Observable` of fetched `TeacherSchema` array
   */
  getTeachers(): Observable<TeacherSchema[]> {
    const rawSlug = '/teachers';
    const url = environment.API_URL + rawSlug;
    return this.http.get<TeacherSchema[]>(url);
  }

  /**
   * Request teacher's data by email
   *
   * @param email Email of teacher whose data need to be fetched
   * @returns An `Observable` of `TeacherSchema`
   */
  getTeacher(email: string): Observable<TeacherSchema> {
    const rawSlug = '/teachers/{email}/';
    const slug = rawSlug.replace('{email}', email);
    const url = environment.API_URL + slug;
    return this.http.get<TeacherSchema>(url);
  }
}
