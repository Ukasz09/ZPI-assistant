import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TypeaheadListComponent } from './typeahead-list.component';

describe('TypeaheadListComponent', () => {
  let component: TypeaheadListComponent;
  let fixture: ComponentFixture<TypeaheadListComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ TypeaheadListComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(TypeaheadListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
