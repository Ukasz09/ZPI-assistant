import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable, throwError } from 'rxjs';
import { environment } from 'src/environments/environment';
import { TeamSchema } from '../schema/team';
@Injectable({
  providedIn: 'root',
})
export class TeamsService {
  constructor(private http: HttpClient) {}

  getAllTeams(): Observable<TeamSchema[]> {
    // const URL = environment.API_URL + Slugs.ALL_TEAMS;
    const URL = 'assets/mocks/teams.json';
    return this.http.get<TeamSchema[]>(URL);
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

    return this.putErrorResponse(
      {
        id: 0,
        teamId: 'Z02',
      },
      403
    );
  }

  addTeamLecturer(teamId: string, lecturerId: string): Observable<any> {
    // let slug = '/teams/addLecturer?teamId={teamId}&lecturerId={lecturerId}';
    // slug = slug.replace('{teamId}', teamId).replace('{lecturerId', lecturerId);
    // const endpoint = environment.API_URL + slug;
    // return this.http.get(endpoint);

    return new BehaviorSubject<any>({});
    // return this.putErrorResponse({});
  }

  /* ------------------------------------------- TMP ------------------------------------------- */
  private putErrorResponse<T>(errorObj: any, statusCode?: number, msg?: string): Observable<T> {
    const error = new HttpErrorResponse({
      error: errorObj,
      status: statusCode ?? 404,
      statusText: msg,
    });
    return throwError(error) as any;
  }
}
