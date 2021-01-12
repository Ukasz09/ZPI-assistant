import { HttpErrorResponse } from '@angular/common/http';
import { Component, OnInit, TemplateRef, ViewChild } from '@angular/core';
import { BsModalRef, BsModalService } from 'ngx-bootstrap/modal';
import { StudentSchema } from 'src/app/data/schema/student';
import { AuthService } from 'src/app/data/services/auth.service';
import { StudentsService } from 'src/app/data/services/students.service';
import { TeamsService } from 'src/app/data/services/teams.service';
import { AccountTypes } from 'src/app/shared/logic/account-types';
import { AlertsService } from 'src/app/shared/services/alert.service';

@Component({
  selector: 'app-students',
  templateUrl: './students.component.html',
  styleUrls: ['./students.component.scss'],
})
export class StudentsComponent implements OnInit {
  @ViewChild('studentInvitationSuccessTemplate') studentInvitationSuccessTemplate: TemplateRef<any>;

  private successfulLecturerInvitationText = '{name} otrzymał zaproszenie do dołączenia do Twojego zespołu';
  studentInvitationSuccessTextLines = [this.successfulLecturerInvitationText];
  fieldsUsedInFilter: string[] = ['name', 'surname', 'index'];
  filteredStudents: StudentSchema[] = [];
  students: StudentSchema[] = [];
  dataReady = false;
  httpError: { statusCode: number; msg: string };
  displayedFieldsInList = ['name', 'surname', 'index'];
  teamIdOfLoggedUser: string;
  modalRef: BsModalRef;

  constructor(
    private studentsService: StudentsService,
    private authService: AuthService,
    private alertsService: AlertsService,
    private teamsService: TeamsService,
    private modalService: BsModalService
  ) {}

  ngOnInit(): void {
    this.fetchStudents();
    this.initTeamIdOfLoggedUser();
  }

  private fetchStudents(): void {
    this.studentsService.getStudents().subscribe(
      (data: StudentSchema[]) => {
        this.students = data;
        this.filteredStudents = this.students;
        this.dataReady = true;
      },
      (e: HttpErrorResponse) =>
        (this.httpError = {
          statusCode: e.status,
          msg: 'Students fetching error: ' + e.statusText,
        })
    );
  }

  private initTeamIdOfLoggedUser(): void {
    this.studentsService.getStudent(this.authService.userId).subscribe(
      (response: StudentSchema) => {
        this.teamIdOfLoggedUser = response.teamId;
      },
      (err: HttpErrorResponse) => {
        this.alertsService.error(`User data fetching error: ${err.message}. Try to refresh page`);
      }
    );
  }

  get addBtnVisible(): boolean {
    return this.authService.userIsLogged && this.userIsStudent;
  }

  get msgBtnVisible(): boolean {
    return this.authService.userIsLogged;
  }

  private get userIsStudent(): boolean {
    return this.authService.userAccountType === AccountTypes.STUDENT;
  }

  onAddBtnClick(student: StudentSchema): void {
    this.addTeamMember(this.teamIdOfLoggedUser, student.index);
  }

  addTeamMember(teamId: string, studentIndex: string): void {
    this.teamsService.addTeamLecturer(teamId, studentIndex).subscribe(
      (_) => {
        this.onCorrectTeamLecturerAdd(studentIndex);
      },
      (err: HttpErrorResponse) => {
        this.alertsService.error(`Invitation not send: ${err.message}`);
      }
    );
  }

  private onCorrectTeamLecturerAdd(studentIndex: string): void {
    const studentModel = this.students.find((s) => s.index === studentIndex);
    const newModalText = this.successfulLecturerInvitationText.replace(
      '{name}',
      `${studentModel.name} ${studentModel.surname} (${studentModel.index})`
    );
    this.studentInvitationSuccessTextLines[0] = newModalText;
    this.openModal(this.studentInvitationSuccessTemplate);
  }

  openModal(template: TemplateRef<any>): void {
    this.modalRef = this.modalService.show(template);
  }
}
