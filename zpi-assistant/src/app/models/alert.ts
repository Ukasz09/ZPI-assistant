export class AlertModel {
  static readonly DEFAULT_SUCCESS_ALERT_ID = 'default-success-alert';
  static readonly DEFAULT_ERROR_ALERT_ID = 'default-error-alert';
  static readonly DEFAULT_WARNING_ALERT_ID = 'default-warning-alert';
  static readonly DEFAULT_INFO_ALERT_ID = 'default-info-alert';

  static readonly DATA_SEND_ERROR_ID = 'data-send-error';
  static readonly DATA_SEND_SUCCESS_ID = 'data-send-success';
  static readonly DATA_RESET_ID = 'data-reset';

  constructor(
    public id: string,
    public type: string,
    public message: string,
    public dismissible: boolean,
    public dismissTimeout: number,
    public sticky: boolean
  ) {}
}
