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
    // const URL = environment.API_URL + Slugs.TEAM;
    // const ENDPOINT = URL.replace('{id}',teamId);
    const ENDPOINT = 'assets/mocks/team.json';
    return this.http.get<TeamSchema>(ENDPOINT);
  }

  createTeam(): Observable<object> {
    // const ENDPOINT = environment.API_URL + Slugs.TEAM;
    // const ENDPOINT = 'assets/mocks/correct-team-creation-response.json';
    // return this.http.post<object>(ENDPOINT, {});
    // throw new HttpErrorResponse({
    //   error: {
    //     id: 0,
    //     teamId: 'Z02',
    //   },
    // });

    //POST ERROR
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

  private putErrorResponse<T>(errorObj: any, statusCode?: number, msg?: string): Observable<T> {
    const error = new HttpErrorResponse({
      error: errorObj,
      status: statusCode ?? 404,
      statusText: msg,
    });
    return throwError(error) as any;
  }
}
