import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { StudentsComponent } from 'src/app/pages/students/students.component';
import { StudentSchema } from '../schema/student';
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
}
