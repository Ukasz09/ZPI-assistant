import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-error-response',
  templateUrl: './error-response.component.html',
  styleUrls: ['./error-response.component.scss'],
})
export class ErrorResponseComponent {
  @Input() errorCode: string;
  @Input() errorText: string;
  @Input() errorTextFontSize = '1.4em';
  @Input() errorCodeFontSize = '5em';
  @Input() errorTextClass = 'text-danger';

  constructor() {}
}
