import { Component, OnInit } from '@angular/core';
import { MovieService } from './movie.service';

@Component({
  selector: 'he-app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {
  query = 'star wars';
  filter = 'both';
  loading;
  data;

  constructor(private movieService: MovieService) { }

  ngOnInit() {
    this.goToPage();
  }

  updateSearch(searchModel: Object): void {
    this.query = searchModel.searchTerm || '';
    this.filter = searchModel.filter || 'both';
    this.goToPage();
  }

  goToPage(page: number = 1) {
    this.loading = true;
    this.movieService.getMovies(this.query, this.filter, page)
    .subscribe(
      data => {
        this.data = data;
      },
      err => {
        console.log('waaaaaa :\'(');
      },
      () => {
        this.loading = false;
    });
  }

}
