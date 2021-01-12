import { HttpErrorResponse } from '@angular/common/http';
import { Component, Input, OnInit } from '@angular/core';
import { StudentSchema } from 'src/app/data/schema/student';
import { TeamSchema } from 'src/app/data/schema/team';
import { AuthService } from 'src/app/data/services/auth.service';
import { StudentsService } from 'src/app/data/services/students.service';
import { TeamsService } from 'src/app/data/services/teams.service';
import { TeamConstants } from 'src/app/shared/logic/team-consts';

@Component({
  selector: 'app-your-team',
  templateUrl: './your-team.component.html',
  styleUrls: ['./your-team.component.scss'],
})
export class YourTeamComponent implements OnInit {
  @Input() teamId: string;

  team: TeamSchema;
  dataReady: boolean;
  httpError: { statusCode: number; msg: string };

  constructor(private teamsService: TeamsService, private authService: AuthService, private studentService: StudentsService) {}

  ngOnInit(): void {
    this.fetchData();
  }

  private fetchData(): void {
    const studentId = this.authService.userId;
    this.studentService.getStudent(studentId).subscribe(
      (data: StudentSchema) => {
        this.fetchTeam(data.teamId);
      },
      (e: HttpErrorResponse) =>
        (this.httpError = {
          statusCode: e.status,
          msg: `User's data fetching error: ${e.statusText}`,
        })
    );
  }

  private fetchTeam(teamId: string): void {
    this.teamsService.getTeam(this.authService.userId).subscribe(
      (data: TeamSchema) => {
        this.team = data;
        this.dataReady = true;
      },
      (e: HttpErrorResponse) =>
        (this.httpError = {
          statusCode: e.status,
          msg: `Team's data fetching error: ${e.statusText}`,
        })
    );
  }

  get lecturerInfoText(): string {
    if (!this.teamHasLecturer) {
      return '<brak opiekuna>';
    }
    return `${this.team.lecturer.title}  ${this.team.lecturer.name}  ${this.team.lecturer.surname} `;
  }

  get teamHasLecturer(): boolean {
    return Object.keys(this.team.lecturer).length !== 0;
  }

  get topicText(): string {
    return this.team.topic || '<brak tematu>';
  }

  get subjectText(): string {
    return this.team.subject || '<brak tematu>';
  }

  get maxNumberOfTeamsMembers(): boolean {
    return this.team.members.length >= TeamConstants.MAX_TEAM_MEMBERS;
  }

  get userIsTeamAdmin(): boolean {
    return this.authService.userId === this.team.adminIndex;
  }

  get loggedUserId(): string {
    return this.authService.userId;
  }
}
