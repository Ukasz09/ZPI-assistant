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
    // const rawSlug = '/teams';
    // const url = environment.API_URL + rawSlug;
    const url = 'assets/mocks/teams.json';
    return this.http.get<TeamSchema[]>(url);
  }

  getTeam(teamId = 'Z2'): Observable<TeamSchema> {
    // const rawSlug = '/teams/{id}';
    // const slug = rawSlug.replace('{id}', teamId);
    // const url = environment.API_URL + slug;

    const url = 'assets/mocks/team.json';
    return this.http.get<TeamSchema>(url);
  }

  createTeam(): Observable<object> {
    // const rawSlug = '/teams';
    // const url = environment.API_URL + rawSlug;

    return this.errorResponse(
      {
        id: ErrorResponseType.ERR_STUDENT_HAVE_TEAM,
        teamId: 'Z02',
      },
      403
    );
  }

  addTeamLecturer(teamId: string, email: string): Observable<any> {
    // const rawSlug = '/teams/addLecturer?teamId={teamId}&email={email}';
    // const slug = rawSlug.replace('{teamId}', teamId).replace('{email', email);
    // const endpoint = environment.API_URL + slug;
    // return this.http.get(endpoint);

    return new BehaviorSubject<any>({});
    // return this.putErrorResponse({});
  }

  leaveTeam(teamId: string, userEmail: string): Observable<any> {
    // const rawSlug = '/teams/leaveTeam?teamId={teamId}&email={email}';
    // const slug = rawSlug.replace('{teamId}', teamId).replace('{email}', userEmail);
    // const url = environment.API_URL + slug;
    // return this.http.put(url, {});

    return new BehaviorSubject({});
  }

  removeTeam(teamId: string): Observable<any> {
    // const rawSlug = '/teams/removeTeam?teamId={teamId}';
    // const slug = rawSlug.replace('{teamId}', teamId);
    // const url = environment.API_URL + slug;
    // return this.http.put(url, {});
    return new BehaviorSubject({});
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
