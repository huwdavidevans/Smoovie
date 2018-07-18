import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { ApiService } from '../tmdb-api.service';
import { environment } from '../../environments/environment';

const IMG_ENDPOINT = environment.imgEndpoint;

@Component({
  templateUrl: './actor.component.html',
  styleUrls: ['./actor.component.scss']
})
export class ActorComponent implements OnInit {
  details: any;
  imagePath: string;
  state: string;
  credits = { state: 'empty', cast: [], crew: [] };

  constructor(private route: ActivatedRoute, private apiService: ApiService) { }

  ngOnInit() {
    const id: number = this.route.snapshot.params['id'];
    this.getDetails(id);
    this.getcredits(id);
  }

  private getDetails(id: number) {
    this.state = 'loading';
    this.apiService.getActorById(id).subscribe(
      data => {
        this.details = data;
        this.imagePath = this.getProfileImagePath();
      },
      err => {
        console.log(err);
        this.state = 'error';
      },
      () => {
        this.state = 'loaded';
      });
  }

  private getcredits(id: number) {
    this.credits.state = 'loading';
    this.apiService.getCreditsByActorId(id).subscribe(
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

  private getProfileImagePath() {
    if (this.details.profile_path) {
      return IMG_ENDPOINT + '/w400' + this.details.profile_path;
    }
    return '/assets/actor-generic.jpg';
  }

  public getPosterImagePath(posterPath: string) {
    if (posterPath) {
      return IMG_ENDPOINT + '/w92' + posterPath;
    }
    return '/assets/movie-generic.jpg';
  }

}
