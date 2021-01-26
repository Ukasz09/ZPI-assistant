import { HttpErrorResponse } from '@angular/common/http';
import { Component, Input, OnInit, TemplateRef, ViewChild } from '@angular/core';
import { FormControl, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { BsModalRef, BsModalService } from 'ngx-bootstrap/modal';
import { StudentSchema } from 'src/app/data/schema/student';
import { TeamSchema } from 'src/app/data/schema/team';
import { AuthService } from 'src/app/data/services/auth.service';
import { StudentsService } from 'src/app/data/services/students.service';
import { TeamsService } from 'src/app/data/services/teams.service';
import { ErrorResponseType } from 'src/app/shared/logic/error-response-types';
import { TeamConstants } from 'src/app/shared/logic/team-consts';
import { AlertsService } from 'src/app/shared/services/alert.service';

@Component({
  selector: 'app-your-team',
  templateUrl: './your-team.component.html',
  styleUrls: ['./your-team.component.scss'],
})
export class YourTeamComponent implements OnInit {
  @ViewChild('successfulRemoveTeamTemplate') successfulRemoveTeamTemplate: TemplateRef<any>;
  @ViewChild('successfulLeftFromTeamTemplate') successfulLeftFromTeamTemplate: TemplateRef<any>;
  @ViewChild('otherErrorTemplate') otherErrorTemplate: TemplateRef<any>;

  modalRef: BsModalRef;
  team: TeamSchema;
  dataReady: boolean;
  httpError: { statusCode: number; msg: string };
  passwordControl: FormControl;
  showIncorrectPasswordAlert = false;
  otherErrorTextLines: string[];

  constructor(
    private router: Router,
    private teamsService: TeamsService,
    private authService: AuthService,
    private studentService: StudentsService,
    private modalService: BsModalService,
    private alertsService: AlertsService
  ) {}

  ngOnInit(): void {
    this.fetchTeam();
    this.initPasswordControl();
  }

  private initPasswordControl(): void {
    this.passwordControl = new FormControl('', [Validators.required, Validators.minLength(4)]);
  }

  private fetchTeam(): void {
    const userEmail = this.authService.user.email;
    this.teamsService.getTeam(userEmail).subscribe(
      (data: TeamSchema) => {
        this.team = data;
        this.dataReady = true;
      },
      (e: HttpErrorResponse) =>
        (this.httpError = {
          statusCode: e.status,
          msg: `Team's data fetching error: ${e.message}`,
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
    return this.team.lecturer && Object.keys(this.team.lecturer).length !== 0;
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
    return this.loggedUserEmail === this.team.adminEmail;
  }

  get loggedUserEmail(): string {
    const userEmail = this.authService.user.email;
    return userEmail;
  }

  openModal(template: TemplateRef<any>): void {
    this.modalRef = this.modalService.show(template);
  }

  leaveTeam(): void {
    const studentEmail = this.loggedUserEmail;
    this.authService.confirmPassword(studentEmail, this.passwordControl.value).subscribe(
      (_) => {
        this.studentService.leaveTeam(studentEmail).subscribe(
          (_) => {
            this.authService.logonUser(this.authService.user.email, this.authService.userAccountType); // in order to refresh data
            this.showIncorrectPasswordAlert = false;
            this.initPasswordControl();
            this.modalRef.hide();
            this.router.navigateByUrl('/teams');
            this.openModal(this.successfulLeftFromTeamTemplate);
          },
          (err: HttpErrorResponse) => {
            this.modalRef.hide();
            this.showIncorrectPasswordAlert = false;
            this.otherErrorTextLines = [err.message];
            this.openModal(this.otherErrorTemplate);
          }
        );
      },
      (err: HttpErrorResponse) => {
        this.showIncorrectPasswordAlert = true;
        if (err.error.id !== ErrorResponseType.INCORRECT_PASSWORD) {
          this.modalRef.hide();
          this.showIncorrectPasswordAlert = false;
          this.otherErrorTextLines = [err.message];
          this.openModal(this.otherErrorTemplate);
        }
      }
    );
  }

  removeTeam(): void {
    const studentEmail = this.loggedUserEmail;
    this.authService.confirmPassword(studentEmail, this.passwordControl.value).subscribe(
      (_) => {
        this.teamsService.removeTeam(this.team.id).subscribe(
          (_) => {
            this.authService.logonUser(this.authService.user.email, this.authService.userAccountType); // in order to refresh data
            this.showIncorrectPasswordAlert = false;
            this.initPasswordControl();
            this.modalRef.hide();
            this.router.navigateByUrl('/teams');
            this.openModal(this.successfulRemoveTeamTemplate);
          },
          (err: HttpErrorResponse) => {
            this.modalRef.hide();
            this.showIncorrectPasswordAlert = false;
            this.otherErrorTextLines = [err.error.message];
            this.openModal(this.otherErrorTemplate);
          }
        );
      },
      (err: HttpErrorResponse) => {
        this.showIncorrectPasswordAlert = true;
        if (err.error.id !== ErrorResponseType.INCORRECT_PASSWORD) {
          this.modalRef.hide();
          this.showIncorrectPasswordAlert = false;
          this.otherErrorTextLines = [err.message];
          this.openModal(this.otherErrorTemplate);
        }
      }
    );
  }

  showNotImplementedError(): void {
    const id = 'notImplemented';
    if (!this.alertsService.contain(id)) {
      this.alertsService.error('Functionality not implemented!', id);
    }
  }
}
