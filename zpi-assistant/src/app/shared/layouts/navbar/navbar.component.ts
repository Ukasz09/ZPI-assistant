import { Component, OnInit } from '@angular/core';
import { AuthService } from 'src/app/data/services/auth.service';
@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.scss'],
})
export class NavbarComponent implements OnInit {
  constructor(private authService: AuthService) {}

  ngOnInit(): void {}

  logonUser(): void {
    this.authService.updateUnreadMsgQty();
    this.authService.logonUser();
  }

  get unreadMsgQty(): number {
    return this.authService.unreadMsgQty;
  }

  get isLogged(): boolean {
    return this.authService.userIsLogged;
  }

  logoutUser(): void {
    this.authService.logoutUser();
  }
}
