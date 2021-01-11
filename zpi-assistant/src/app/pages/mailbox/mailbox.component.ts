import { HttpErrorResponse } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { Message } from 'src/app/data/schema/mailbox-message';
import { AuthService } from 'src/app/data/services/auth.service';
import { MailboxService } from 'src/app/data/services/mailbox.service';
import { MessageTypes } from 'src/app/shared/logic/message-types';

@Component({
  selector: 'app-mailbox',
  templateUrl: './mailbox.component.html',
  styleUrls: ['./mailbox.component.scss'],
})
export class MailboxComponent implements OnInit {
  mails: Message[] = [];
  dataReady = false;
  httpError: { statusCode: number; msg: string };
  actualDisplayedMsg: Message;

  constructor(private mailboxService: MailboxService, private authService: AuthService) {}

  ngOnInit(): void {
    this.fetchMails();
  }

  private fetchMails(): void {
    const userId = this.authService.userId;
    this.mailboxService.getMessages(userId).subscribe(
      (data: Message[]) => {
        this.mails = data;
        if (this.mails.length > 0) {
          this.actualDisplayedMsg = this.mails[0];
        }
        this.dataReady = true;
      },
      (err: HttpErrorResponse) => {
        this.httpError = {
          statusCode: err.status,
          msg: 'Mails fetching error: ' + err.statusText,
        };
      }
    );
  }

  get actualDisplayedMsgIsInvitation(): boolean {
    return this.actualDisplayedMsg.type === MessageTypes.INVITATION;
  }

  onMsgClick(message: Message): void {
    this.actualDisplayedMsg = message;
    this.changeIsReadStateOfMsg(message);
  }

  private changeIsReadStateOfMsg(message: Message): void {
    message.isRead = true;
    this.mailboxService.updateMessage(this.authService.userId, message.id).subscribe(
      (_) => this.authService.updateUnreadMsgQty(),
      (err: HttpErrorResponse) => {
        //TODO: add alert
      }
    );
  }

  messageClass(message: Message): string {
    return this.actualDisplayedMsg === message ? 'btn-dark' : 'btn-outline-secondary';
  }
}
