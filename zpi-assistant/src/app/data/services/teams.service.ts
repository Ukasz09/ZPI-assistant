import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { TeamSchema } from '../schema/team';

@Injectable({
  providedIn: 'root',
})
export class TeamsService {
  constructor(private http: HttpClient) {}

  getTeams(): Observable<TeamSchema[]> {
    // const URL = environment.API_URL + Slugs.TEAMS;
    const URL = 'assets/mocks/teams.json';
    return this.http.get<TeamSchema[]>(URL);
  }
}
