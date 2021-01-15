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
    // gdzie to jest w UI? ^^

    // const rawSlug = '/students/{email}';
    // const slug = rawSlug.replace('{email}', userEmail);
    // const url = environment.API_URL + rawSlug;
    const url = 'assets/mocks/student.json';
    return this.http.get<StudentSchema>(url);
  }

  leaveTeam(studentEmail: string): Observable<any> {
    // chyba nie wiem pod którym to jest przyciskiem

    // const rawSlug = '/students/leaveTeam?email={email}';
    // const slug = rawSlug.replace('{email}',userEmail);
    // const url = environment.API_URL + rawSlug;
    return new BehaviorSubject<any>({});
  }
  //DODAWANIE STUDENTÓW
  //przycisk 'dodaj studentów' widzę tylko gdy zespół ma jakichś członków?
  //i co się dzieje po kliknięciu tego 'dodaj' przy konkretnym studencie?
  //czy nie rozpatrujemy tego use casea i w rzeczywistości nie wysyłamy żadnego zaproszenia?

  acceptInvitation(userEmail: string, messageId: string): Observable<{ teamId: string }> {
    // jeśli userEmail to email adresata zaproszenia
    // to zaproszenie które jest pod messageId
    // musi mieć jako nadawcę email admina zespołu
    // żeby znaleźć zespół do którego trzeba przypisać adresata. tak?
    // (bo na razie w bazie mamy nadawców jako 'ZPI-Assistant')

    // const rawSlug = '/mailbox/accept?email={email}&messageId={messageId}';
    // const slug = rawSlug.replace('{email', email).replace('{messageId}', messageId);
    // const url = environment.API_URL + slug;
    // this.http.put(url, {});
    return new BehaviorSubject<{ teamId: string }>({ teamId: 'Z03' });
  }
}
