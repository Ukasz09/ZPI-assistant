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
import { TeamConstants } from 'src/app/shared/logic/team-consts';

@Component({
  selector: 'app-your-team',
  templateUrl: './your-team.component.html',
  styleUrls: ['./your-team.component.scss'],
})
export class YourTeamComponent implements OnInit {
  @ViewChild('successfulLeftFromTeamTemplate') successfulLeftFromTeamTemplate: TemplateRef<any>;
  @Input() teamId: string;

  modalRef: BsModalRef;
  team: TeamSchema;
  dataReady: boolean;
  httpError: { statusCode: number; msg: string };
  passwordControl: FormControl;

  constructor(
    private router: Router,
    private teamsService: TeamsService,
    private authService: AuthService,
    private studentService: StudentsService,
    private modalService: BsModalService
  ) {}

  ngOnInit(): void {
    this.fetchData();
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
    return this.authService.userEmail === this.team.adminEmail;
  }

  get loggedUserEmail(): string {
    return this.authService.userEmail;
  }

  openModal(template: TemplateRef<any>): void {
    this.modalRef = this.modalService.show(template);
  }

  onConfirmTeamLeavingClick() {} //TODO:

  leaveTeam(): void {
    this.modalRef.hide();
    const studentEmail = this.authService.userEmail;
    this.teamsService.leaveTeam(this.teamId, studentEmail).subscribe(
      (_) => {
        this.modalRef.hide();
        this.router.navigateByUrl('/teams');
        this.openModal(this.successfulLeftFromTeamTemplate);
      },
      (err: HttpErrorResponse) => {}
    );
  }
}
