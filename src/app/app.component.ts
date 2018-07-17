import { Component, OnInit } from '@angular/core';
import { MovieService } from './movie.service';

@Component({
  selector: 'he-app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {
  state = 'empty';
  filter = 'both';
  query;
  data;

  constructor(private movieService: MovieService) { }

  ngOnInit() {  }

  updateSearch(searchModel: any): void {
    this.query = searchModel.searchTerm || '';
    this.filter = searchModel.filter || 'both';
    this.goToPage();
  }

  goToPage(page: number = 1) {
    this.state = 'loading';
    this.movieService.searchMovieDb(this.query, this.filter, page)
    .subscribe(
      data => {
        this.data = data;
      },
      err => {
        console.log(err);
        this.state = 'error';
      },
      () => {
        this.state = 'loaded';
    });
  }

}
