import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { ApiService } from '../tmdb-api.service';
import { environment } from '../../environments/environment';

const IMG_ENDPOINT = environment.imgEndpoint;

@Component({
  selector: 'he-movie',
  templateUrl: './movie.component.html',
  styleUrls: ['./movie.component.scss']
})
export class MovieComponent implements OnInit {

  constructor(private route: ActivatedRoute, private apiService: ApiService) { }
  details: any;
  imagePath: string;
  state: string;
  credits = { state: 'empty', cast: [], crew: [] };

  ngOnInit() {
    const id: number = this.route.snapshot.params['id'];
    this.getDetails(id);
    this.getCredits(id);
  }
  private getDetails(id: number) {
    this.state = 'loading';
    this.apiService.getMovieById(id).subscribe(
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

  private getCredits(id: number) {
    this.credits.state = 'loading';
    this.apiService.getCreditsByMovieId(id).subscribe(
      (data: any) => {
        this.credits.cast = data.cast ? data.cast : [];
        this.credits.crew = data.crew ? data.crew : [];
      },
      err => {
        console.log(err);
        this.credits.state = 'error';
      },
      () => {
        this.credits.state = 'loaded';
      }
    );
  }

  private getImagePath() {
    if (this.details.poster_path) {
      return IMG_ENDPOINT + '/w400' + this.details.poster_path;
    }
    return '/assets/movie-generic.jpg';
  }

  public getProfileImagePath(profilePath: string) {
    if (profilePath) {
      return IMG_ENDPOINT + '/w92' + profilePath;
    }
    return '/assets/actor-generic.jpg';
  }
}
