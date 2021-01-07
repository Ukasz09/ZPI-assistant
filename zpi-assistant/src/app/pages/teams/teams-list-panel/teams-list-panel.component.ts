import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-teams-list-panel',
  templateUrl: './teams-list-panel.component.html',
  styleUrls: ['./teams-list-panel.component.scss'],
})
export class TeamsListPanelComponent implements OnInit {
  dataReady = true;
  teams = [
    { id: 'Z01', subject: '<brak tematu>' },
    { id: 'Z02', subject: '<brak tematu>' },
    { id: 'Z03', subject: 'aplikacja mobilna "Pogodynka Express"' },
    { id: 'Z04', subject: '<brak tematu>' },
    { id: 'Z05', subject: 'aplikacja webowa' },
    { id: 'Z01', subject: '<brak tematu>' },
    { id: 'Z02', subject: '<brak tematu>' },
    { id: 'Z03', subject: 'aplikacja mobilna' },
    { id: 'Z04', subject: '<brak tematu>' },
    { id: 'Z05', subject: 'aplikacja webowa' },
    { id: 'Z01', subject: '<brak tematu>' },
    { id: 'Z02', subject: '<brak tematu>' },
    { id: 'Z03', subject: 'aplikacja mobilna' },
    { id: 'Z04', subject: '<brak tematu>' },
    { id: 'Z05', subject: 'aplikacja webowa' },
    { id: 'Z01', subject: '<brak tematu>' },
    { id: 'Z02', subject: '<brak tematu>' },
    { id: 'Z03', subject: 'aplikacja mobilna' },
    { id: 'Z04', subject: '<brak tematu>' },
    { id: 'Z05', subject: 'aplikacja webowa' },
    { id: 'Z01', subject: '<brak tematu>' },
    { id: 'Z02', subject: '<brak tematu>' },
    { id: 'Z03', subject: 'aplikacja mobilna' },
    { id: 'Z04', subject: '<brak tematu>' },
    { id: 'Z05', subject: 'aplikacja webowa' },
    { id: 'Z01', subject: '<brak tematu>' },
    { id: 'Z02', subject: '<brak tematu>' },
    { id: 'Z03', subject: 'aplikacja mobilna' },
    { id: 'Z04', subject: '<brak tematu>' },
    { id: 'Z05', subject: 'aplikacja webowa' },
  ];

  constructor() {}

  ngOnInit(): void {}
}
