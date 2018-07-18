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

  constructor(private route: ActivatedRoute, private apiService: ApiService) { }

  ngOnInit() {
    const id: number = this.route.snapshot.params['id'];
    this.state = 'loading';
    this.apiService.getActorById(id).subscribe(
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
    if (this.details.profile_path) {
      return IMG_ENDPOINT + '/w400' + this.details.profile_path;
    }
    return '/assets/actor-generic.jpg';
  }

}
