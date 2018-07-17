import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';

@Component({
  selector: 'he-search-bar',
  templateUrl: './search-bar.component.html',
  styleUrls: ['./search-bar.component.scss']
})
export class SearchBarComponent implements OnInit {

  model = {
    searchTerm: '',
    filter: 'both'
  };

  @Output() searchChange: EventEmitter<Object> = new EventEmitter();

  constructor() {}
  ngOnInit() {}

  submit(event) {
    if (event) {
      event.preventDefault();
    }
    if (this.model.searchTerm) {
      this.searchChange.emit(this.model);
    }
  }

}
