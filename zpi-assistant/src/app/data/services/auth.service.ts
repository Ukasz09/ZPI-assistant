import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { emit } from 'process';
import { BehaviorSubject, Observable, throwError } from 'rxjs';
import { AccountTypes } from 'src/app/shared/logic/account-types';
import { ErrorResponseType } from 'src/app/shared/logic/error-response-types';
import { NavbarService } from 'src/app/shared/services/navbar.service';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  userIsLogged = false;
  userAccountType: AccountTypes;
  userEmail: string;

  constructor(private http: HttpClient, private navbarService: NavbarService) {}

  logonUser(email: string, accountType: AccountTypes): void {
    //this.userEmail = 'danek.dundersztyc@pwr.edu.pl'; //TODO: tmp
    this.userEmail = email;
    this.userAccountType = accountType;
    this.userIsLogged = true;
    this.navbarService.updateUnreadMsgQty(email);
  }

  logoutUser(): void {
    this.userIsLogged = false;
    this.userEmail = '';
  }

  confirmPassword(email: string, password: string): Observable<{ accountType: AccountTypes }> {
    // działa 

    const rawSlug = '/auth?email={email}&password={password}';
    const slug = rawSlug.replace('{email}', email).replace('{password}', password);
    const url = environment.API_URL + slug;
    return this.http.get<{ accountType: AccountTypes }>(url);

    //return new BehaviorSubject({ accountType: AccountTypes.STUDENT });
    // return this.errorResponse({ id: ErrorResponseType.INCORRECT_PASSWORD });
  }

  /* ------------------------------------------- TMP ------------------------------------------- */
  private errorResponse<T>(errorObj: any, statusCode?: number, msg?: string): Observable<T> {
    const error = new HttpErrorResponse({
      error: errorObj,
      status: statusCode ?? 404,
      statusText: msg,
    });
    return throwError(error) as any;
  }
}
