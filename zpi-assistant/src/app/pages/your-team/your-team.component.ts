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
  @Input() teamId: string;

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
    this.fetchData();
    this.initPasswordControl();
  }

  private initPasswordControl(): void {
    this.passwordControl = new FormControl('', [Validators.required, Validators.minLength(4)]);
  }

  private fetchData(): void {
    const studentId = this.authService.userEmail;
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
    this.teamsService.getTeam(this.authService.userEmail).subscribe(
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
    return this.authService.userEmail === this.team.adminEmail;
  }

  get loggedUserEmail(): string {
    return this.authService.userEmail;
  }

  openModal(template: TemplateRef<any>): void {
    this.modalRef = this.modalService.show(template);
  }

  leaveTeam(): void {
    const studentEmail = this.authService.userEmail;
    this.authService.confirmPassword(studentEmail, this.passwordControl.value).subscribe(
      (_) => {
        this.teamsService.leaveTeam(this.teamId, studentEmail).subscribe(
          (_) => {
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
    const studentEmail = this.authService.userEmail;
    this.authService.confirmPassword(studentEmail, this.passwordControl.value).subscribe(
      (_) => {
        this.teamsService.removeTeam(this.teamId).subscribe(
          (_) => {
            this.showIncorrectPasswordAlert = false;
            this.initPasswordControl();
            this.modalRef.hide();
            this.router.navigateByUrl('/teams');
            this.openModal(this.successfulRemoveTeamTemplate);
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

  showNotImplementedError(): void {
    const id = 'notImplemented';
    if (!this.alertsService.contain(id)) {
      this.alertsService.error('Functionality not implemented!', id);
    }
  }
}
