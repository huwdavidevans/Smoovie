import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { MovieService } from '../movie.service';
import { environment } from '../../environments/environment';

const IMG_ENDPOINT = environment.imgEndpoint;

@Component({
  selector: 'he-movie',
  templateUrl: './movie.component.html',
  styleUrls: ['./movie.component.scss']
})
export class MovieComponent implements OnInit {

  constructor(private route: ActivatedRoute, private movieService: MovieService) { }
  details: any;
  imagePath: string;
  state: string;

  ngOnInit() {
    const id: number = this.route.snapshot.params['id'];
    this.state = 'loading';
    this.movieService.getMovieById(id).subscribe(
      data => {
        this.details = data;
        this.imagePath = this.getImagePath();
      },
      err => {
        console.log(err);
        this.state = 'error';
      },
      () => {
        this.state = 'loaded';
      });
  }

  private getImagePath() {
    if (this.details.poster_path) {
      return IMG_ENDPOINT + '/w400' + this.details.poster_path;
    }
    return '/assets/movie-generic.jpg';
  }

}
