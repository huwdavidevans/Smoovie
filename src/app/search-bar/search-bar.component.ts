import { Component, OnInit, Input } from '@angular/core';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'he-search-bar',
  templateUrl: './search-bar.component.html',
  styleUrls: ['./search-bar.component.scss']
})
export class SearchBarComponent implements OnInit {

  @Input() userInput: string;

  constructor() { }

  ngOnInit() {
  }

  submit(event) {
    event.preventDefault();
    console.log(this.userInput);
  }

}
