import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { AccountTypes } from 'src/app/shared/logic/account-types';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  userIsLogged = false;
  userAccountType: AccountTypes;
  userEmail: string;

  constructor(private http: HttpClient) {}

  logonUser(email: string, accountType: AccountTypes): void {
    this.userEmail = email;
    this.userAccountType = accountType;
    this.userIsLogged = true;
  }

  logoutUser(): void {
    this.userIsLogged = false;
    this.userEmail = '';
  }

  confirmPassword(email: string, password: string): Observable<{ accountType: AccountTypes }> {
    // const rawSlug = '/auth?email={email}&password={password}';
    // const slug = rawSlug.replace('{email}', email).replace('{password}', password);
    // const url = environment.API_URL + slug;
    // return this.http.get<{ accountType: AccountTypes }>(url);
    return new BehaviorSubject({ accountType: AccountTypes.STUDENT });
  }
}
