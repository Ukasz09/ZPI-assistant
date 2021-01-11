import { Injectable } from '@angular/core';
import { AccountTypes } from 'src/app/shared/logic/account-types';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  userIsLogged = false;
  userAccountType: AccountTypes;
  userId: string;

  constructor() {
    this.mockData();
  }

  //TODO: tmp mocked
  mockData(): void {
    this.userIsLogged = true;
    this.userAccountType = AccountTypes.STUDENT;
    this.userId = 'Z04';
  }
}
