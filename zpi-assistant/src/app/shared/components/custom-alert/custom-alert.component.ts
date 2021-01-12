import { Component } from '@angular/core';
import { AlertModel } from 'src/app/models/alert';
import { AlertsService } from '../../services/alert.service';

@Component({
  selector: 'app-custom-alert',
  templateUrl: './custom-alert.component.html',
  styleUrls: ['./custom-alert.component.scss'],
})
export class CustomAlertComponent {
  constructor(public alertsService: AlertsService) {}

  onAlertClose(alert: AlertModel): void {
    this.alertsService.remove(alert);
  }
}
