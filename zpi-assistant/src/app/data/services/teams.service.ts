import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { TeamSchema } from '../schema/team';
@Injectable({
  providedIn: 'root',
})
export class TeamsService {
  constructor(private http: HttpClient) {}

  getAllTeams(): Observable<TeamSchema[]> {
    const rawSlug = '/teams';
    const url = environment.API_URL + rawSlug;
    return this.http.get<TeamSchema[]>(url);
  }

  getTeam(studentEmail: string): Observable<TeamSchema> {
    const rawSlug = '/teams/{studentEmail}/';
    const slug = rawSlug.replace('{studentEmail}', studentEmail);
    const url = environment.API_URL + slug;
    return this.http.get<TeamSchema>(url);
  }

  createTeam(studentEmail: string): Observable<any> {
    const rawSlug = '/teams/{studentEmail}/';
    const slug = rawSlug.replace('{studentEmail}', studentEmail);
    const url = environment.API_URL + slug;
    return this.http.put(url, {});
  }

  addTeamLecturer(teamId: string, email: string): Observable<any> {
    const rawSlug = '/teams/addLecturer?teamId={teamId}&email={email}';
    const slug = rawSlug.replace('{teamId}', teamId).replace('{email}', email);
    const endpoint = environment.API_URL + slug;
    return this.http.put(endpoint, {});
  }

  removeTeam(teamId: string): Observable<any> {
    const rawSlug = '/teams/{teamId}/';
    const slug = rawSlug.replace('{teamId}', teamId);
    const url = environment.API_URL + slug;
    return this.http.delete(url, {});
  }
}
