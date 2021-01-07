import { HttpErrorResponse } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { Team } from 'src/app/data/schema/team';
import { TeamsService } from 'src/app/data/services/teams.service';

@Component({
  selector: 'app-teams-list-panel',
  templateUrl: './teams-list-panel.component.html',
  styleUrls: ['./teams-list-panel.component.scss'],
})
export class TeamsListPanelComponent implements OnInit {
  dataReady = false;
  teams: Team[];
  httpError: { statusCode: number; msg: string };
  actualDisplayedTeamId: string;

  constructor(private teamsService: TeamsService) {}

  ngOnInit(): void {
    this.fetchTeams();
  }

  private fetchTeams() {
    this.teamsService.getTeams().subscribe(
      (data: Team[]) => {
        this.teams = data;
        this.dataReady = true;
        if (this.teams.length > 0) this.actualDisplayedTeamId = this.teams[0].id;
      },
      (e: HttpErrorResponse) =>
        (this.httpError = {
          statusCode: e.status,
          msg: 'Available teams fetching error: ' + e.statusText,
        })
    );
  }

  isActualDisplayedTeam(teamId: string): boolean {
    return this.actualDisplayedTeamId == teamId;
  }

  teamListRowClass(teamId: string) {
    return this.isActualDisplayedTeam(teamId) ? 'btn-success' : 'btn-light';
  }
}
