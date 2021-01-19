import { Component, OnDestroy, OnInit } from '@angular/core';
import { Subscription, timer } from 'rxjs';
import { StudentSchema } from 'src/app/data/schema/student';
import { TeacherSchema } from 'src/app/data/schema/teacher';
import { AuthService } from 'src/app/data/services/auth.service';
import { AccountTypes } from '../../logic/account-types';
import { AlertsService } from '../../services/alert.service';
import { NavbarService } from '../../services/navbar.service';
@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.scss'],
})
export class NavbarComponent implements OnInit, OnDestroy {
  readonly poolingDueTime = 1000;
  readonly poolingRefreshPeriod = 2000;
  mailboxPoolingSubscription: Subscription;

  constructor(private navbarService: NavbarService, private authService: AuthService, private alertService: AlertsService) {}

  ngOnInit(): void {
    this.initMailboxPooling();
  }

  private initMailboxPooling(): void {
    const source = timer(this.poolingDueTime, this.poolingRefreshPeriod);
    this.unsubscribeMailboxPooling();
    this.mailboxPoolingSubscription = source.subscribe((_) => {
      if (this.isLogged) {
        this.navbarService.updateUnreadMsgQty(this.user.email);
      }
    });
  }

  ngOnDestroy(): void {
    this.unsubscribeMailboxPooling();
  }

  private unsubscribeMailboxPooling(): void {
    if (this.mailboxPoolingSubscription) {
      this.mailboxPoolingSubscription.unsubscribe();
    }
  }

  get unreadMsgQty(): number {
    return this.navbarService.unreadMsgQty;
  }

  get isLogged(): boolean {
    return this.authService.userIsLogged;
  }

  get user(): StudentSchema | TeacherSchema {
    return this.authService.user;
  }

  get userIsStudent(): boolean {
    return this.authService.userAccountType === AccountTypes.STUDENT;
  }

  get studentIndexNumber(): string {
    return (this.user as StudentSchema).index;
  }

  get accountType(): string {
    return AccountTypes[this.authService.userAccountType];
  }

  logoutUser(): void {
    this.authService.logoutUser();
  }
}
