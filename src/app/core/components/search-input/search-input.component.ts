import { Component, ChangeDetectionStrategy, Input, Output, EventEmitter } from '@angular/core';

@Component({
  selector: 'zz-search-input',
  changeDetection: ChangeDetectionStrategy.OnPush,
  templateUrl: './search-input.component.html',
  styleUrls: ['./search-input.component.scss'],
})
export class SearchInputComponent {
  @Input()
  query: any;

  @Output()
  search = new EventEmitter;

  text: string;

  searchText() {
    this.search.next({ search: this.text });
  }
}
