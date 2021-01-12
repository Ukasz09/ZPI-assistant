import { HttpErrorResponse } from '@angular/common/http';
import { Component, OnInit, TemplateRef, ViewChild } from '@angular/core';
import { BsModalRef, BsModalService } from 'ngx-bootstrap/modal';
import { ErrorResponseType } from 'src/app/data/schema/error-response-types';
import { AuthService } from 'src/app/data/services/auth.service';
import { StudentsService } from 'src/app/data/services/students.service';
import { TeamsService } from 'src/app/data/services/teams.service';
import { AccountTypes } from 'src/app/shared/logic/account-types';
import { TeamsListPanelComponent } from './teams-list-panel/teams-list-panel.component';

@Component({
  selector: 'app-teams',
  templateUrl: './teams.component.html',
  styleUrls: ['./teams.component.scss'],
})
export class TeamsComponent implements OnInit {
  @ViewChild('teamCreationSuccessTemplate') teamCreationSuccessTemplate: TemplateRef<any>;
  @ViewChild('teamCreationErrHasTeamTemplate') teamCreationErrHasTeamTemplate: TemplateRef<any>;
  @ViewChild('otherErrorTemplate') otherErrorTemplate: TemplateRef<any>;
  @ViewChild('teamListPanelTemplate') teamListPanelTemplate: TeamsListPanelComponent;

  modalRef: BsModalRef;
  private successfulTeamCreationText = 'Zespół {id} został pomyślnie utworzony';
  private alreadyAMemberOfTeamText = 'Jesteś członkiem zespołu: {id}';
  teamCreationErrHaveTeamLines = [this.alreadyAMemberOfTeamText, 'Czy chcesz opuścić zespół?'];
  otherErrorText: string;
  teamCreationSuccessTextLines = [this.successfulTeamCreationText, 'Przypisano studenta jako administratora zespołu'];

  constructor(
    private modalService: BsModalService,
    private teamsService: TeamsService,
    private authService: AuthService,
    private studentService: StudentsService
  ) {}

  ngOnInit(): void {}

  openModal(template: TemplateRef<any>): void {
    this.modalRef = this.modalService.show(template);
  }

  onCreateTeamClick(): void {
    this.teamsService.createTeam().subscribe(
      (data: any) => {
        this.onCorrectTeamCreationResponse(data);
      },
      (err: HttpErrorResponse) => {
        const response = err.error;
        if (this.isUserHaveTeamError(response)) {
          this.incorrectTeamCreationResponse(response);
        } else {
          this.otherErrorText = response.message;
          this.openModal(this.otherErrorTemplate);
        }
      }
    );
  }

  private isUserHaveTeamError(data: any): boolean {
    return 'id' in data && data['id'] == ErrorResponseType.ERR_STUDENT_HAVE_TEAM;
  }

  onCorrectTeamCreationResponse(data: any): void {
    this.teamListPanelTemplate.fetchTeams();
    this.teamCreationSuccessTextLines[0] = this.successfulTeamCreationText.replace('{id}', `${data['id']}`);
    this.openModal(this.teamCreationSuccessTemplate);
  }

  incorrectTeamCreationResponse(response: { id: string; teamId: string }): void {
    this.teamCreationErrHaveTeamLines[0] = this.alreadyAMemberOfTeamText.replace('{id}', `${response.teamId}`);
    this.openModal(this.teamCreationErrHasTeamTemplate);
  }

  leaveTeam(): void {
    this.studentService.leaveTeam(this.authService.userId).subscribe(
      (_) => {
        // this.onCreateTeamClick();
        this.modalRef.hide();
        this.onCorrectTeamCreationResponse({ id: 'Z40' }); //TODO: tmp
      },
      (err: HttpErrorResponse) => {
        this.otherErrorText = err.message;
        this.openModal(this.otherErrorTemplate);
      }
    );
  }

  get actionButtonsVisible(): boolean {
    return this.authService.userIsLogged && this.authService.userAccountType === AccountTypes.STUDENT;
  }
}
