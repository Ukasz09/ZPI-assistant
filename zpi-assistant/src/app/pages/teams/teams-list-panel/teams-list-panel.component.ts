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

  constructor(private teamsService: TeamsService) {}

  ngOnInit(): void {
    this.fetchTeams();
  }

  private fetchTeams() {
    this.teamsService.getTeams().subscribe(
      (data: Team[]) => {
        this.teams = data;
        this.dataReady = true;
      },
      (e: HttpErrorResponse) =>
        (this.httpError = {
          statusCode: e.status,
          msg: 'Available teams fetching error: ' + e.statusText,
        })
    );
  }
}
