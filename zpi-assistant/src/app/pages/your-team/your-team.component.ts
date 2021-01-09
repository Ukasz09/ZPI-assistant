import { HttpErrorResponse } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { StudentSchema } from 'src/app/data/schema/student';
import { TeamSchema } from 'src/app/data/schema/team';
import { TeamsService } from 'src/app/data/services/teams.service';

@Component({
  selector: 'app-your-team',
  templateUrl: './your-team.component.html',
  styleUrls: ['./your-team.component.scss'],
})
export class YourTeamComponent implements OnInit {
  team: TeamSchema;
  dataReady: boolean;
  httpError: { statusCode: number; msg: string };

  constructor(private teamsService: TeamsService) {}

  ngOnInit(): void {
    this.fetchTeam();
  }

  private fetchTeam(): void {
    this.teamsService.getTeam().subscribe(
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
}
