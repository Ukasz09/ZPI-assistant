import { HttpErrorResponse } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { TeamSchema } from 'src/app/data/schema/team';
import { TeamsService } from 'src/app/data/services/teams.service';

@Component({
  selector: 'app-teams-list-panel',
  templateUrl: './teams-list-panel.component.html',
  styleUrls: ['./teams-list-panel.component.scss'],
})
export class TeamsListPanelComponent implements OnInit {
  dataReady = false;
  httpError: { statusCode: number; msg: string };
  teams: TeamSchema[];
  actualDisplayedTeamId: string;

  constructor(private teamsService: TeamsService) {}

  ngOnInit(): void {
    this.fetchTeams();
  }

  private fetchTeams(): void {
    this.teamsService.getAllTeams().subscribe(
      (data: TeamSchema[]) => {
        this.teams = data;
        this.dataReady = true;
        if (this.teams.length > 0) {
          this.actualDisplayedTeamId = this.teams[0].id;
        }
      },
      (e: HttpErrorResponse) =>
        (this.httpError = {
          statusCode: e.status,
          msg: 'Available teams fetching error: ' + e.statusText,
        })
    );
  }

  isActualDisplayedTeam(teamId: string): boolean {
    return this.actualDisplayedTeamId === teamId;
  }

  teamListRowClass(teamId: string): string {
    return this.isActualDisplayedTeam(teamId) ? 'btn-success' : 'btn-light';
  }

  getTopicText(team: TeamSchema): string {
    return team.topic || '<brak tematu>';
  }

  getSubjectText(team: TeamSchema): string {
    return team.subject || '<brak tematu>';
  }
}
