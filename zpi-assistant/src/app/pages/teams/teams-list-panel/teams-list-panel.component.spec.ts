import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TeamsListPanelComponent } from './teams-list-panel.component';

describe('TeamsListPanelComponent', () => {
  let component: TeamsListPanelComponent;
  let fixture: ComponentFixture<TeamsListPanelComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ TeamsListPanelComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(TeamsListPanelComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
