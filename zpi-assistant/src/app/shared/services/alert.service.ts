import { Injectable } from '@angular/core';
import { AlertModel } from 'src/app/models/alert';
import { AlertType } from '../logic/alert-types';

@Injectable({
  providedIn: 'root',
})
export class AlertsService {
  alerts: AlertModel[] = [];

  constructor() {}

  success(message: string, id?: string, dismissible?: boolean, dismissTimeout?: number, sticky?: boolean): void {
    const alert = new AlertModel(
      id ?? AlertModel.DEFAULT_SUCCESS_ALERT_ID,
      AlertType.SUCCESS,
      message,
      dismissible ?? true,
      dismissTimeout ?? 4000,
      sticky ?? true
    );
    this.alerts.push(alert);
  }

  error(message: string, id?: string, dismissible?: boolean, dismissTimeout?: number, sticky?: boolean): void {
    const alert = new AlertModel(
      id ?? AlertModel.DEFAULT_ERROR_ALERT_ID,
      AlertType.DANGER,
      message,
      dismissible ?? true,
      dismissTimeout ?? 5000,
      sticky ?? true
    );
    this.alerts.push(alert);
  }

  warning(message: string, id?: string, dismissible?: boolean, dismissTimeout?: number, sticky?: boolean): void {
    const alert = new AlertModel(
      id ?? AlertModel.DEFAULT_WARNING_ALERT_ID,
      AlertType.WARNING,
      message,
      dismissible ?? true,
      dismissTimeout ?? 3000,
      sticky ?? true
    );
    this.alerts.push(alert);
  }

  info(message: string, id?: string, dismissible?: boolean, dismissTimeout?: number, sticky?: boolean): void {
    const alert = new AlertModel(
      id ?? AlertModel.DEFAULT_INFO_ALERT_ID,
      AlertType.INFO,
      message,
      dismissible ?? true,
      dismissTimeout ?? 2000,
      sticky ?? true
    );
    this.alerts.push(alert);
  }

  remove(alert: AlertModel): void {
    this.alerts = this.alerts.filter((a) => a != alert);
  }

  removeAllWithId(id: string): void {
    this.alerts = this.alerts.filter((a) => a.id != id);
  }

  removeAllExceptId(id: string): void {
    this.alerts = this.alerts.filter((a) => a.id == id);
  }

  removeAllWithType(type: string): void {
    this.alerts = this.alerts.filter((a) => a.type != type);
  }

  removeAllExceptType(type: string): void {
    this.alerts = this.alerts.filter((a) => a.type == type);
  }

  clear(): void {
    this.alerts = [];
  }

  contain(id: string): boolean {
    return this.alerts.find((a) => a.id === id) !== undefined;
  }
}
