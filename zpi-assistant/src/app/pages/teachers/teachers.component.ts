import { HttpErrorResponse } from '@angular/common/http';
import { Component, OnInit, TemplateRef, ViewChild } from '@angular/core';
import { BsModalRef, BsModalService } from 'ngx-bootstrap/modal';
import { StudentSchema } from 'src/app/data/schema/student';
import { TeacherSchema } from 'src/app/data/schema/teacher';
import { AuthService } from 'src/app/data/services/auth.service';
import { StudentsService } from 'src/app/data/services/students.service';
import { TeachersService } from 'src/app/data/services/teachers.service';
import { TeamsService } from 'src/app/data/services/teams.service';
import { AccountTypes } from 'src/app/shared/logic/account-types';
import { AlertsService } from 'src/app/shared/services/alert.service';

@Component({
  selector: 'app-teachers',
  templateUrl: './teachers.component.html',
  styleUrls: ['./teachers.component.scss'],
})
export class TeachersComponent implements OnInit {
  @ViewChild('lecturerInvitationSuccessTemplate') lecturerInvitationSuccessTemplate: TemplateRef<any>;

  fieldsUsedInFilter: string[] = ['name', 'surname'];
  filteredTeachers: TeacherSchema[] = [];
  teachers: TeacherSchema[] = [];
  dataReady = false;
  httpError: { statusCode: number; msg: string };
  displayedFieldsInList = ['title', 'name', 'surname'];
  teamIdOfLoggedUser: string;
  private successfulLecturerInvitationText = '{name} otrzymał prośbę dotyczącą objęcia opieki nad zespołem';
  lecturerInvitationSuccessTextLines = [this.successfulLecturerInvitationText];
  modalRef: BsModalRef;
  userIsTeamAdmin = false;

  constructor(
    private teachersService: TeachersService,
    private authService: AuthService,
    private teamsService: TeamsService,
    private studentService: StudentsService,
    private modalService: BsModalService,
    private alertsService: AlertsService
  ) {}

  ngOnInit(): void {
    this.fetchTeachers();
    this.initTeamIdOfLoggedUser();
    if (this.userIsStudent) {
      this.fetchStudentInfo();
    }
  }

  private fetchTeachers(): void {
    this.teachersService.getTeachers().subscribe(
      (data: TeacherSchema[]) => {
        this.teachers = data;
        this.filteredTeachers = this.teachers;
        this.dataReady = true;
      },
      (e: HttpErrorResponse) =>
        (this.httpError = {
          statusCode: e.status,
          msg: 'Lecturers fetching error: ' + e.statusText,
        })
    );
  }

  private fetchStudentInfo(): void {
    this.studentService.getStudent(this.authService.userEmail).subscribe(
      (student: StudentSchema) => {
        this.userIsTeamAdmin = student.isTeamAdmin;
      },
      (err: HttpErrorResponse) => {
        this.alertsService.error(err.message);
        throw err;
      }
    );
  }

  private initTeamIdOfLoggedUser(): void {
    this.studentService.getStudent(this.authService.userEmail).subscribe(
      (response: StudentSchema) => {
        this.teamIdOfLoggedUser = response.teamId;
      },
      (err: HttpErrorResponse) => {
        this.alertsService.error(`User data fetching error: ${err.message}. Try to refresh page`);
      }
    );
  }

  get addBtnVisible(): boolean {
    return this.authService.userIsLogged && this.userIsStudent && this.userIsTeamAdmin;
  }

  get msgBtnVisible(): boolean {
    return this.authService.userIsLogged;
  }

  private get userIsStudent(): boolean {
    return this.authService.userAccountType === AccountTypes.STUDENT;
  }

  onAddBtnClick(teacher: TeacherSchema): void {
    this.addTeamLecturer(this.teamIdOfLoggedUser, teacher.id);
  }

  addTeamLecturer(teamId: string, teacherId: string): void {
    this.teamsService.addTeamLecturer(teamId, teacherId).subscribe(
      (_) => {
        this.onCorrectTeamLecturerAdd(teacherId);
      },
      (err: HttpErrorResponse) => {
        this.alertsService.error(`Invitation not send: ${err.message}`);
      }
    );
  }

  private onCorrectTeamLecturerAdd(teacherId: string): void {
    const teacherModel = this.teachers.find((t) => t.id === teacherId);
    const newModalText = this.successfulLecturerInvitationText.replace(
      '{name}',
      `${teacherModel.title} ${teacherModel.name} ${teacherModel.surname}`
    );
    this.lecturerInvitationSuccessTextLines[0] = newModalText;
    this.openModal(this.lecturerInvitationSuccessTemplate);
  }

  openModal(template: TemplateRef<any>): void {
    this.modalRef = this.modalService.show(template);
  }

  showNotImplementedError(): void {
    const id = 'notImplemented';
    if (!this.alertsService.contain(id)) {
      this.alertsService.error('Functionality not implemented!', id);
    }
  }
}
