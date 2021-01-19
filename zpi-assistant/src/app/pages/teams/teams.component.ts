import { HttpErrorResponse } from '@angular/common/http';
import { Component, OnInit, TemplateRef, ViewChild } from '@angular/core';
import { BsModalRef, BsModalService } from 'ngx-bootstrap/modal';
import { ErrorResponseType } from 'src/app/shared/logic/error-response-types';
import { AuthService } from 'src/app/data/services/auth.service';
import { StudentsService } from 'src/app/data/services/students.service';
import { TeamsService } from 'src/app/data/services/teams.service';
import { AccountTypes } from 'src/app/shared/logic/account-types';
import { TeamsListPanelComponent } from './teams-list-panel/teams-list-panel.component';
import { AlertsService } from 'src/app/shared/services/alert.service';

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
    private studentService: StudentsService,
    private alertService: AlertsService
  ) {}

  ngOnInit(): void {}

  openModal(template: TemplateRef<any>): void {
    this.modalRef = this.modalService.show(template);
  }

  onCreateTeamClick(): void {
    const userEmail = this.authService.user.email;
    this.teamsService.createTeam(userEmail).subscribe(
      (data: { teamId: string }) => {
        this.teamListPanelTemplate.fetchTeams();
        this.teamCreationSuccessTextLines[0] = this.successfulTeamCreationText.replace('{id}', `${data.teamId}`);
        this.openModal(this.teamCreationSuccessTemplate);
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

  private isUserHaveTeamError(data: { id: ErrorResponseType }): boolean {
    return 'id' in data && data.id === ErrorResponseType.ERR_STUDENT_HAVE_TEAM;
  }

  onCorrectTeamCreationResponse(data: { id: string }): void {}

  incorrectTeamCreationResponse(response: { id: string; teamId: string }): void {
    this.teamCreationErrHaveTeamLines[0] = this.alreadyAMemberOfTeamText.replace('{id}', `${response.teamId}`);
    this.openModal(this.teamCreationErrHasTeamTemplate);
  }

  leaveTeam(): void {
    const userEmail = this.authService.user.email;
    this.studentService.leaveTeam(userEmail).subscribe(
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

  showNotImplementedError(): void {
    const id = 'notImplemented';
    if (!this.alertService.contain(id)) {
      this.alertService.error('Functionality not implemented!', id);
    }
  }
}
