import { Component, OnInit } from '@angular/core';
import { MovieService } from './movie.service';

@Component({
  selector: 'he-app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {
  title = 'Smoovie';
  data;

  constructor(private movieService: MovieService) { }

  ngOnInit() {
    this.movieService.getMovies()
      .subscribe(
        data => {
          this.data = data;
        },
        err => {
          console.log('waaaaaa :\'(');
        });
  }

}
