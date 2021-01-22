import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { AccountTypes } from 'src/app/shared/logic/account-types';
import { AlertsService } from 'src/app/shared/services/alert.service';
import { NavbarService } from 'src/app/shared/services/navbar.service';
import { environment } from 'src/environments/environment';
import { StudentSchema } from '../schema/student';
import { TeacherSchema } from '../schema/teacher';
import { StudentsService } from './students.service';
import { TeachersService } from './teachers.service';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  userIsLogged = false;
  userAccountType: AccountTypes;
  user: StudentSchema | TeacherSchema;

  constructor(
    private http: HttpClient,
    private navbarService: NavbarService,
    private studentService: StudentsService,
    private alertService: AlertsService,
    private teacherService: TeachersService
  ) {}

  /**
   * Mark user as logged and fetch his data
   *
   * @param email Email of logged user
   * @param accountType Account type of user with given email
   */
  logonUser(email: string, accountType: AccountTypes): void {
    if (accountType === AccountTypes.STUDENT) {
      this.studentService.getStudent(email).subscribe(
        (response: StudentSchema) => {
          this.user = response;
          this.userAccountType = accountType;
          this.userIsLogged = true;
          this.navbarService.updateUnreadMsgQty(email);
        },
        (err: HttpErrorResponse) => {
          this.alertService.error(`${err.status} - Student data fetching error`);
          throw err;
        }
      );
    } else {
      this.teacherService.getTeacher(email).subscribe(
        (response: TeacherSchema) => {
          this.user = response;
          this.userAccountType = accountType;
          this.userIsLogged = true;
          this.navbarService.updateUnreadMsgQty(email);
        },
        (err: HttpErrorResponse) => {
          this.alertService.error(`${err.status} - Teacher data fetching error`);
          throw err;
        }
      );
    }
  }

  /**
   * Logout user
   */
  logoutUser(): void {
    this.userIsLogged = false;
    this.user = undefined;
  }

  /**
   * Request for password confirmation
   *
   * @param email Email of checked user
   * @param password Password of checked user
   * @returns  An `Observable` of POJO containing type of authenticated user's account
   */
  confirmPassword(email: string, password: string): Observable<{ accountType: AccountTypes }> {
    const rawSlug = '/auth?email={email}&password={password}';
    const slug = rawSlug.replace('{email}', email).replace('{password}', password);
    const url = environment.API_URL + slug;
    return this.http.get<{ accountType: AccountTypes }>(url);
  }
}
