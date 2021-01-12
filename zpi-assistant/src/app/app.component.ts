import { Component } from '@angular/core';
import { AlertModel } from './models/alert';
import { AlertsService } from './shared/services/alert.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
})
export class AppComponent {
  title = 'zpi-assistant';

  constructor(private alertsService: AlertsService) {}

  get alerts(): AlertModel[] {
    return this.alertsService.alerts;
  }
}
