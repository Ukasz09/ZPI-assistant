import { HttpErrorResponse } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { StudentSchema } from 'src/app/data/schema/student';
import { TeacherSchema } from 'src/app/data/schema/teacher';
import { UserSchema } from 'src/app/data/schema/user';
import { AuthService } from 'src/app/data/services/auth.service';
import { AccountTypes } from '../../logic/account-types';
import { AlertsService } from '../../services/alert.service';
import { NavbarService } from '../../services/navbar.service';
@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.scss'],
})
export class NavbarComponent implements OnInit {
  constructor(private navbarService: NavbarService, private authService: AuthService, private alertService: AlertsService) {}

  ngOnInit(): void {}

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
