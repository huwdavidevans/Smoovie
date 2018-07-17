import { Component, OnInit, OnChanges, Input } from '@angular/core';
import { environment } from '../../environments/environment';

const IMG_ENDPOINT = environment.imgEndpoint;

@Component({
  selector: 'he-movie-poster',
  templateUrl: './movie-poster.component.html',
  styleUrls: ['./movie-poster.component.scss']
})
export class MoviePosterComponent implements OnInit, OnChanges {

  id: number;
  imagePath: string;
  movieTitle: string;

  @Input() movie: any;
  constructor() { }

  ngOnInit() {}
  ngOnChanges(changes) {
    if (!this.movie) { return; }
    this.id = this.movie.id;
    this.imagePath = this.movie.poster_path ? IMG_ENDPOINT + '/w200' + this.movie.poster_path : '/assets/movie-generic.jpg';
    this.movieTitle = this.movie.title;
  }

}
