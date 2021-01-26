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

  /**
   * Request all teams data
   *
   * @returns An `Observable` of fetched `TeamSchema` array
   */
  getAllTeams(): Observable<TeamSchema[]> {
    const rawSlug = '/teams';
    const url = environment.API_URL + rawSlug;
    return this.http.get<TeamSchema[]>(url);
  }

  /**
   * Request team data of student's with given email
   *
   * @param studentEmail Email of student whose team is fetched
   * @returns An `Observable` of `TeamSchema` to whose belongs given student
   */
  getTeam(studentEmail: string): Observable<TeamSchema> {
    const rawSlug = '/teams/{studentEmail}/';
    const slug = rawSlug.replace('{studentEmail}', studentEmail);
    const url = environment.API_URL + slug;
    return this.http.get<TeamSchema>(url);
  }

  /**
   * Request to create team and set student with given email as it's administrator
   *
   * @param studentEmail Email of student who is creator of the team
   * @returns An `Observable` of POJO containing id of created team
   */
  createTeam(studentEmail: string): Observable<{ teamId: string }> {
    const rawSlug = '/teams/{studentEmail}/';
    const slug = rawSlug.replace('{studentEmail}', studentEmail);
    const url = environment.API_URL + slug;
    return this.http.put<{ teamId: string }>(url, {});
  }

  /**
   * Request to add lecturer with given email to team with given id
   *
   * @param teamId Id of team to which add lecturer
   * @param email Email of lecturer whose need to be added to team
   * @returns  An `Observable` of empty object
   */
  addTeamLecturer(teamId: string, email: string): Observable<{}> {
    const rawSlug = '/teams/addLecturer?teamId={teamId}&email={email}';
    const slug = rawSlug.replace('{teamId}', teamId).replace('{email}', email);
    const endpoint = environment.API_URL + slug;
    return this.http.put(endpoint, {});
  }

  /**
   * Request to add student with given email to team with given id
   *
   * @param teamId Id of team
   * @param email Email of student whose need to be added to team
   * @returns  An `Observable` of empty object
   */
  inviteStudent(teamId: string, email: string): Observable<{}> {
    const rawSlug = '/teams/invite?teamId={teamId}&studentEmail={email}';
    const slug = rawSlug.replace('{teamId}', teamId).replace('{email}', email);
    const endpoint = environment.API_URL + slug;
    return this.http.post(endpoint, {});
  }

  /**
   * Request to remove team with given id
   *
   * @param teamId Id of team to remove
   * @returns  An `Observable` of empty object
   */
  removeTeam(teamId: string): Observable<{}> {
    const rawSlug = '/teams/{teamId}/';
    const slug = rawSlug.replace('{teamId}', teamId);
    const url = environment.API_URL + slug;
    return this.http.delete(url, {});
  }
}
