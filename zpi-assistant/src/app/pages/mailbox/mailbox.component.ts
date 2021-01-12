import { HttpErrorResponse } from '@angular/common/http';
import { Component, OnInit, TemplateRef, ViewChild } from '@angular/core';
import { BsModalRef, BsModalService } from 'ngx-bootstrap/modal';
import { ErrorResponseType } from 'src/app/shared/logic/error-response-types';
import { Message } from 'src/app/data/schema/mailbox-message';
import { AuthService } from 'src/app/data/services/auth.service';
import { MailboxService } from 'src/app/data/services/mailbox.service';
import { StudentsService } from 'src/app/data/services/students.service';
import { MessageTypes } from 'src/app/shared/logic/message-types';
import { AlertsService } from 'src/app/shared/services/alert.service';
import { NavbarService } from 'src/app/shared/services/navbar.service';

@Component({
  selector: 'app-mailbox',
  templateUrl: './mailbox.component.html',
  styleUrls: ['./mailbox.component.scss'],
})
export class MailboxComponent implements OnInit {
  @ViewChild('otherErrorTemplate') otherErrorTemplate: TemplateRef<any>;
  @ViewChild('teamJoinErrHasTeamTemplate') teamJoinErrHasTeamTemplate: TemplateRef<any>;
  @ViewChild('successTeamJoinTemplate') successTeamJoinTemplate: TemplateRef<any>;
  @ViewChild('correctInvitationDismissTemplate') correctInvitationDismissTemplate: TemplateRef<any>;

  private successTeamJoinText = 'Pomyślnie dołączono do zespołu: {teamId}';
  private alreadyAMemberOfTeamText = 'Jesteś członkiem zespołu: {id}';
  teamJoinErrHaveTeamLines = [this.alreadyAMemberOfTeamText, 'Czy chcesz opuścić zespół?'];
  otherErrorText: string;
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
    private modalService: BsModalService,
    private navbarService: NavbarService
  ) {}

  ngOnInit(): void {
    this.fetchMails();
  }

  private fetchMails(): void {
    const userEmail = this.authService.userEmail;
    this.mailboxService.getMessages(userEmail).subscribe(
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
    this.mailboxService.markMessageAsReaded(this.authService.userEmail, message.id).subscribe(
      (_) => this.navbarService.updateUnreadMsgQty(this.authService.userEmail),
      (err: HttpErrorResponse) => {
        this.alertService.error('Update message status failed');
        throw err;
      }
    );
  }

  messageClass(message: Message): string {
    return this.actualDisplayedMsg === message ? 'btn-dark' : 'btn-outline-secondary';
  }

  onAcceptInvitation(): void {
    this.studentService.acceptInvitation(this.authService.userEmail, this.actualDisplayedMsg.id).subscribe(
      (response: { teamId: string }) => {
        this.onAcceptInvitationCorrectResponse(response.teamId);
      },
      (err: HttpErrorResponse) => {
        const response = err.error;
        if (this.isUserHaveTeamError(response)) {
          this.onIncorrectTeamJoinHasTeamResponse(response);
        } else {
          this.otherErrorText = response.message;
          this.openModal(this.otherErrorTemplate);
        }
      }
    );
  }
  private isUserHaveTeamError(data: any): boolean {
    return 'id' in data && data['id'] == ErrorResponseType.ERR_STUDENT_HAVE_TEAM;
  }

  private onAcceptInvitationCorrectResponse(teamId: string): void {
    this.successTeamJoinTextLines[0] = this.successTeamJoinText.replace('{teamId}', teamId);
    this.openModal(this.successTeamJoinTemplate);
    this.fetchMails();
  }

  private onIncorrectTeamJoinHasTeamResponse(response: { id: string; teamId: string }): void {
    this.teamJoinErrHaveTeamLines[0] = this.alreadyAMemberOfTeamText.replace('{id}', `${response.teamId}`);
    this.openModal(this.teamJoinErrHasTeamTemplate);
  }

  openModal(template: TemplateRef<any>): void {
    this.modalRef = this.modalService.show(template);
  }

  leaveTeam(): void {
    this.studentService.leaveTeam(this.authService.userEmail).subscribe(
      (_) => {
        // this.onAcceptInvitation();
        this.modalRef.hide();
        this.onAcceptInvitationCorrectResponse('Z40'); //TODO: tmp
      },
      (err: HttpErrorResponse) => {
        this.otherErrorText = err.message;
        this.openModal(this.otherErrorTemplate);
      }
    );
  }

  dismissInvitation(): void {
    this.modalRef.hide();
    this.mailboxService.deleteMessage(this.authService.userEmail, this.actualDisplayedMsg.id).subscribe(
      () => {
        this.openModal(this.correctInvitationDismissTemplate);
        this.fetchMails();
      },
      (err: HttpErrorResponse) => {
        this.otherErrorText = err.message;
        this.openModal(this.otherErrorTemplate);
      }
    );
  }

  showNotImplementedError(): void {
    const id = 'notImplemented';
    if (!this.alertService.contain(id)) {
      this.alertService.error('Functionality not implemented!', id);
    }
  }
}
