export class AlertModel {
  static readonly DEFAULT_SUCCESS_ALERT_ID = 'default-success-alert';
  static readonly DEFAULT_ERROR_ALERT_ID = 'default-error-alert';
  static readonly DEFAULT_WARNING_ALERT_ID = 'default-warning-alert';
  static readonly DEFAULT_INFO_ALERT_ID = 'default-info-alert';

  constructor(
    public id: string,
    public type: string,
    public message: string,
    public dismissible: boolean,
    public dismissTimeout: number,
    public sticky: boolean
  ) {}
}
