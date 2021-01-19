import { HttpErrorResponse } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/data/services/auth.service';
import { AccountTypes } from 'src/app/shared/logic/account-types';
import { AlertsService } from 'src/app/shared/services/alert.service';

@Component({
  selector: 'app-signin',
  templateUrl: './signin.component.html',
  styleUrls: ['./signin.component.scss'],
})
export class SigninComponent implements OnInit {
  email = '';
  password = '';
  wasVaidated = false;

  constructor(private authService: AuthService, private alertService: AlertsService, private router: Router) {}

  ngOnInit(): void {}

  onSubmit(isValid: boolean): void {
    if (!isValid) {
      this.wasVaidated = true;
    } else {
      this.authService.confirmPassword(this.email, this.password).subscribe(
        (response: { accountType: AccountTypes }) => {
          this.authService.logonUser(this.email, response.accountType);
          this.router.navigateByUrl('/teams');
          this.alertService.success('Successful logon');
        },
        (err: HttpErrorResponse) => {
          if (err.error?.message) {
            this.alertService.error(`${err.status} - ${err.error.message}`);
          } else {
            this.alertService.error(`${err.status} - Other error`);
          }
        }
      );
    }
  }
}
