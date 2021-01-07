import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Team } from '../schema/team';

@Injectable({
  providedIn: 'root',
})
export class TeamsService {
  constructor(private http: HttpClient) {}

  getTeams(): Observable<Team[]> {
    // const URL = environment.API_URL + Slugs.TEAMS;
    const URL = 'assets/mocks/teams.json';
    return this.http.get<Team[]>(URL);
  }
}
