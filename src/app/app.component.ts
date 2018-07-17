import { Component, OnInit } from '@angular/core';
import { MovieService } from './movie.service';

@Component({
  selector: 'he-app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {
  filter = 'both';
  state = 'empty';
  query;
  data;
  discoverResults;

  constructor(private movieService: MovieService) { }

  ngOnInit() {
    this.goToDiscoverPage();
  }

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

  goToDiscoverPage(page: number = 1) {
    this.state = 'loading';
    this.movieService.getPopularMovieDb(page)
    .subscribe(
      (data: any) => {
        this.discoverResults = data.results;
      },
      err => {
        console.log(err);
        this.state = 'error';
      },
      () => {
        this.state = 'discoverLoaded';
    });
  }
}
