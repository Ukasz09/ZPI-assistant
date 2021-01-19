import { Injectable } from '@angular/core';
import { MailboxService } from 'src/app/data/services/mailbox.service';
import { AlertsService } from './alert.service';

@Injectable({
  providedIn: 'root',
})
export class NavbarService {
  unreadMsgQty = 0;
  constructor(private mailboxService: MailboxService, private alertService: AlertsService) {}

  updateUnreadMsgQty(userEmail: string): void {
    this.mailboxService.getMessages(userEmail).subscribe(
      (response) => {
        this.unreadMsgQty = 0;
        for (const msg of response) {
          if (!msg.isRead) {
            this.unreadMsgQty++;
          }
        }
      },
      (err) => {
        this.alertService.error('Update message status failed');
        throw err;
      }
    );
  }
}
