import { Injectable } from '@angular/core';
import { MailboxService } from 'src/app/data/services/mailbox.service';

@Injectable({
  providedIn: 'root',
})
export class NavbarService {
  unreadMsgQty = 0;
  constructor(private mailboxService: MailboxService) {}

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
        throw err;
      }
    );
  }
}
