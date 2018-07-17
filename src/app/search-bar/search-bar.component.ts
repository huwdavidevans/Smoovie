import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { FormsModule } from '@angular/forms';

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

  @Output() searchChange: EventEmitter<string> = new EventEmitter();

  constructor() { }

  ngOnInit() {}

  submit(event) {
    event.preventDefault();
    if (this.model.searchTerm) {
      this.searchChange.emit(this.model);
    }
  }

}
