import { Component, OnInit, TemplateRef } from '@angular/core';
import { BsModalRef, BsModalService } from 'ngx-bootstrap/modal';

@Component({
  selector: 'app-teams',
  templateUrl: './teams.component.html',
  styleUrls: ['./teams.component.scss'],
})
export class TeamsComponent implements OnInit {
  modalRef: BsModalRef;
  private successfulTeamCreationText = 'Zespół {id} został pomyślnie utworzony';
  teamCreationSuccessTextLines = [this.successfulTeamCreationText, 'Przypisano studenta jako administratora zespołu'];

  constructor(private modalService: BsModalService) {}

  ngOnInit(): void {}

  openModal(template: TemplateRef<any>): void {
    this.modalRef = this.modalService.show(template);
  }

  onCreateTeamClick(template: TemplateRef<any>): void {
    const randNumber = Math.floor(Math.random() * 26) + 1;
    this.teamCreationSuccessTextLines[0] = this.successfulTeamCreationText.replace('{id}', `Z${randNumber}`);
    this.openModal(template);
  }
}
