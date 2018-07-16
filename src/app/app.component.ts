import { Component, OnInit } from '@angular/core';
import { MovieService } from './movie.service';

@Component({
  selector: 'he-app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {
  title = 'Smoovie';
  query = 'star wars';
  data;

  constructor(private movieService: MovieService) { }

  ngOnInit() {
    this.goToPage();
  }

  goToPage(page: number = 1) {
    this.movieService.getMovies(this.query, page)
    .subscribe(
      data => {
        this.data = data;
      },
      err => {
        console.log('waaaaaa :\'(');
      });
  }

}
