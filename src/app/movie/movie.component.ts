import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { MovieService } from '../movie.service';

@Component({
  selector: 'he-movie',
  templateUrl: './movie.component.html',
  styleUrls: ['./movie.component.scss']
})
export class MovieComponent implements OnInit {

  constructor(private route: ActivatedRoute, private movieService: MovieService) { }
  details: any;
  state: string;

  ngOnInit() {
    const id: number = this.route.snapshot.params['id'];
    this.state = 'loading';
    this.movieService.getMovieById(id).subscribe(
      data => {
        this.details = data;
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
