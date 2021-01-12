import { Component, Input } from '@angular/core';
import { AlertModel } from 'src/app/models/alert';
import { AlertsService } from '../../services/alert.service';

@Component({
  selector: 'app-custom-alert',
  templateUrl: './custom-alert.component.html',
  styleUrls: ['./custom-alert.component.scss'],
})
export class CustomAlertComponent {
  @Input() alert: AlertModel;

  constructor(private alertsService: AlertsService) {}

  onAlertClose(alert: AlertModel): void {
    this.alertsService.remove(alert);
  }
}
