import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'app-modal-response',
  templateUrl: './modal-response.component.html',
  styleUrls: ['./modal-response.component.scss'],
})
export class ModalResponseComponent implements OnInit {
  @Input() textLines: string[] = [];
  @Input() headerText: string;
  @Input() type: string;

  constructor() {}

  ngOnInit(): void {}
}
