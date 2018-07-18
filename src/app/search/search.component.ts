import { Component, OnInit } from '@angular/core';
import { ApiService } from '../tmdb-api.service';

@Component({
  selector: 'he-search',
  templateUrl: './search.component.html',
  styleUrls: ['./search.component.scss']
})
export class SearchComponent implements OnInit {

  filter = 'both';
  state = 'empty';
  query;
  data;
  discoverResults;

  constructor(private apiService: ApiService) { }

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
    this.apiService.searchMovies(this.query, this.filter, page)
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
    this.apiService.getPopularMovies(page)
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
