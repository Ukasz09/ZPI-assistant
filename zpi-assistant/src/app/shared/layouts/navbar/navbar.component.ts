import { HttpErrorResponse } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { AuthService } from 'src/app/data/services/auth.service';
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

  logoutUser(): void {
    this.authService.logoutUser();
  }
}
