import { Component, EventEmitter, Input, OnChanges, OnInit, Output, SimpleChanges } from '@angular/core';

@Component({
  selector: 'app-typeahead-list',
  templateUrl: './typeahead-list.component.html',
  styleUrls: ['./typeahead-list.component.scss'],
})
export class TypeaheadListComponent implements OnInit, OnChanges {
  @Input() modelsList: object[] = [];
  @Input() fieldsFromModelUsedInFilter: string[];
  @Input() displayedFieldsFromModel: string[];
  @Input() dataReady = false;
  @Input() httpError: { statusCode: number; msg: string };
  @Input() inputPromptText: string;
  @Input() inputPlaceholderText: string;
  @Input() addBtnText = 'Dodaj';
  @Input() addBtnVisible: boolean;
  @Input() msgBtnVisible: boolean;

  @Output() messageBtnClick = new EventEmitter<object>();
  @Output() addBtnClick = new EventEmitter<object>();

  filteredModelsList: object[] = [];
  private _searchFilter = '';

  constructor() {}

  ngOnChanges(changes: SimpleChanges): void {
    if (changes.dataReady && this.dataReady) {
      this.filteredModelsList = this.modelsList;
      console.log('set filtered to normal');
    }
  }

  ngOnInit(): void {}

  get searchFilter(): string {
    return this._searchFilter;
  }

  set searchFilter(value: string) {
    this._searchFilter = value;
    if (this.searchFilter) {
      this.filteredModelsList = this.performFilter(this.searchFilter);
    } else {
      this.filteredModelsList = this.modelsList;
    }
  }

  private performFilter(filterBy: string): object[] {
    filterBy = filterBy.toLowerCase();
    return this.modelsList.filter((obj: object) => this.isInFilter(filterBy, obj));
  }

  private isInFilter(filterBy: string, obj: object): boolean {
    const phrases = filterBy.split(/[ ,]+/);
    for (const p of phrases) {
      if (p) {
        let contain = false;
        for (const field of this.fieldsFromModelUsedInFilter) {
          if (obj[field].toLowerCase().indexOf(p) !== -1) {
            contain = true;
          }
        }
        if (contain === false) {
          return false;
        }
      }
    }
    return true;
  }
}
