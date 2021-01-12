import { HttpErrorResponse } from '@angular/common/http';
import { Component, OnInit, TemplateRef, ViewChild } from '@angular/core';
import { BsModalRef, BsModalService } from 'ngx-bootstrap/modal';
import { Message } from 'src/app/data/schema/mailbox-message';
import { AuthService } from 'src/app/data/services/auth.service';
import { MailboxService } from 'src/app/data/services/mailbox.service';
import { StudentsService } from 'src/app/data/services/students.service';
import { MessageTypes } from 'src/app/shared/logic/message-types';
import { AlertsService } from 'src/app/shared/services/alert.service';

@Component({
  selector: 'app-mailbox',
  templateUrl: './mailbox.component.html',
  styleUrls: ['./mailbox.component.scss'],
})
export class MailboxComponent implements OnInit {
  @ViewChild('successTeamJoinTemplate') successTeamJoinTemplate: TemplateRef<any>;

  private successTeamJoinText = 'Pomyślnie dołączono do zespołu: {teamId}';
  successTeamJoinTextLines = [this.successTeamJoinText];
  mails: Message[] = [];
  dataReady = false;
  httpError: { statusCode: number; msg: string };
  actualDisplayedMsg: Message;
  modalRef: BsModalRef;

  constructor(
    private mailboxService: MailboxService,
    private authService: AuthService,
    private alertService: AlertsService,
    private studentService: StudentsService,
    private modalService: BsModalService
  ) {}

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
    if (!message.isRead) {
      this.changeIsReadStateOfMsg(message);
    }
  }

  private changeIsReadStateOfMsg(message: Message): void {
    message.isRead = true;
    this.mailboxService.updateMessage(this.authService.userId, message.id).subscribe(
      (_) => this.authService.updateUnreadMsgQty(),
      (err: HttpErrorResponse) => {
        this.alertService.error('Update message status failed');
      }
    );
  }

  messageClass(message: Message): string {
    return this.actualDisplayedMsg === message ? 'btn-dark' : 'btn-outline-secondary';
  }

  onAcceptInvitation(): void {
    this.studentService.acceptInvitation(this.authService.userId, this.actualDisplayedMsg.id).subscribe(
      (response: { teamId: string }) => {
        this.successTeamJoinTextLines[0] = this.successTeamJoinText.replace('{teamId}', response.teamId);
        this.openModal(this.successTeamJoinTemplate);
        this.fetchMails();
      },
      (err: HttpErrorResponse) => {
        //TODO:
      }
    );
  }

  openModal(template: TemplateRef<any>): void {
    this.modalRef = this.modalService.show(template);
  }
}
