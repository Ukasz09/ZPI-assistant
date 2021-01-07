import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'app-data-loading',
  templateUrl: './data-loading.component.html',
  styleUrls: ['./data-loading.component.scss'],
})
export class DataLoadingComponent implements OnInit {
  @Input() text = 'Loading data';
  @Input() spinnerSize = '5em';

  constructor() {}

  ngOnInit(): void {}
}
