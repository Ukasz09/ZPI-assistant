import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable, throwError } from 'rxjs';
import { ErrorResponseType } from 'src/app/shared/logic/error-response-types';
import { MessageTypes } from 'src/app/shared/logic/message-types';
import { environment } from 'src/environments/environment';
import { TeamSchema } from '../schema/team';
@Injectable({
  providedIn: 'root',
})
export class TeamsService {
  constructor(private http: HttpClient) {}

  getAllTeams(): Observable<TeamSchema[]> {
    //działa

    const rawSlug = '/teams';
    const url = environment.API_URL + rawSlug;
    //const url = 'assets/mocks/teams.json';
    return this.http.get<TeamSchema[]>(url);
  }

  getTeam(teamId = 'Z2'): Observable<TeamSchema> {
    //konieczny / na końcu rawSlug
    //działa gdy student ma zespół, gdy nie ma, wyświetla pustą stronę
    //(nie powinno być jakiegoś alertu, że nie ma teamu ? albo zablokowany ten przycisk?)

    const rawSlug = '/teams/{id}/';
    const slug = rawSlug.replace('{id}', teamId);
    const url = environment.API_URL + slug;

    //const url = 'assets/mocks/team.json';
    return this.http.get<TeamSchema>(url);
  }

  createTeam(studentEmail: string): Observable<any> {
     //trochę nie wiem jak to powinno być odmockowane
    //ale w takiej formie chyba działa (tzn. dla scenariusza głównego)
    const rawSlug = '/teams/{studentEmail}/'; // raczej: '/teams/{studentEmail}/'
    const slug = rawSlug.replace('{studentEmail}', studentEmail);
    const url = environment.API_URL + slug;
    return this.http.put(url, {})
    /*return this.errorResponse(
      {
        id: ErrorResponseType.ERR_STUDENT_HAVE_TEAM,
        teamId: 'Z02',
      },
      403
    );*/
  }
  // Przycisk edycji opiekuna pojawia się dopiero jak już jest opiekun dodany
  addTeamLecturer(teamId: string, email: string): Observable<any> {
    // chyba nie wiem jak powinno być odmockowane
    // bo jest 'func not implemented' pod tym przyciskiem w UI

    // const rawSlug = '/teams/addLecturer?teamId={teamId}&email={email}';
    // const slug = rawSlug.replace('{teamId}', teamId).replace('{email', email);
    // const endpoint = environment.API_URL + slug;
    // return this.http.put(endpoint,{});

    return new BehaviorSubject<any>({});
    // return this.putErrorResponse({});
  }

  removeTeam(teamId: string): Observable<any> {
    //działa

    const rawSlug = '/teams/{teamId}/';
    const slug = rawSlug.replace('{teamId}', teamId);
    const url = environment.API_URL + slug;
    return this.http.delete(url, {});
    //return new BehaviorSubject({});
  }

  /* ------------------------------------------- TMP ------------------------------------------- */
  private errorResponse<T>(errorObj: any, statusCode?: number, msg?: string): Observable<T> {
    const error = new HttpErrorResponse({
      error: errorObj,
      status: statusCode ?? 404,
      statusText: msg,
    });
    return throwError(error) as any;
  }
}
