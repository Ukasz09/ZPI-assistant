import { Injectable } from '@angular/core';
import { AccountTypes } from 'src/app/shared/logic/account-types';
import { MailboxService } from './mailbox.service';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  userIsLogged = false;
  userAccountType: AccountTypes;
  userId: string;
  unreadMsgQty = 0;

  constructor(private mailboxService: MailboxService) {}

  //TODO: tmp mocked
  logonUser(): void {
    this.userIsLogged = true;
    // this.userAccountType = AccountTypes.STUDENT;
    this.userAccountType = AccountTypes.STUDENT;
    // this.userId = '285736';
    this.userId = '260937';
  }

  updateUnreadMsgQty(): void {
    this.mailboxService.getMessages(this.userId).subscribe(
      (response) => {
        this.unreadMsgQty = 0;
        for (const msg of response) {
          if (!msg.isRead) {
            this.unreadMsgQty++;
          }
        }
      },
      (err) => {
        throw err;
      }
    );
  }

  logoutUser(): void {
    this.userIsLogged = false;
  }
}
