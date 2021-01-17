import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { StudentSchema } from '../schema/student';

@Injectable({
  providedIn: 'root',
})
export class StudentsService {
  constructor(private http: HttpClient) {}

  getStudents(): Observable<StudentSchema[]> {
    //działa

    const rawSlug = '/students';
    const url = environment.API_URL + rawSlug;
    //const url = 'assets/mocks/students.json';
    return this.http.get<StudentSchema[]>(url);
  }

  getStudent(userEmail: string): Observable<StudentSchema> {

    const rawSlug = '/students/{email}/';
    const slug = rawSlug.replace('{email}', userEmail);
    const url = environment.API_URL + slug;
    //const url = 'assets/mocks/student.json';
    return this.http.get<StudentSchema>(url);
  }

  leaveTeam(studentEmail: string): Observable<any> {
    // jak nie udało się opuścić zespołu to i tak wyświetla że się udało
    // ale jak się da to opuszcza

    const rawSlug = '/students/leaveTeam?email={email}';
    const slug = rawSlug.replace('{email}', studentEmail);
    const url = environment.API_URL + slug;

    return this.http.put(url, {});
    //return new BehaviorSubject<any>({});
  }
  //DODAWANIE STUDENTÓW
  //przycisk 'dodaj studentów' widzę tylko gdy zespół ma jakichś członków?
  // albo chyba tylko gdy ma opiekuna?
  //i co się dzieje po kliknięciu tego 'dodaj' przy konkretnym studencie?
  //czy nie rozpatrujemy tego use casea i w rzeczywistości nie wysyłamy żadnego zaproszenia?

  acceptInvitation(userEmail: string, messageId: string): Observable<any> {
    // chyba działa

    const rawSlug = '/mailbox/accept?email={email}&messageId={messageId}';
    const slug = rawSlug.replace('{email}', userEmail).replace('{messageId}', messageId);
    const url = environment.API_URL + slug;

    return this.http.put(url, {});
    //return new BehaviorSubject<{ teamId: string }>({ teamId: 'Z03' });
  }
}
