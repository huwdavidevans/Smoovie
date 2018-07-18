import { Component, OnInit, Input, OnChanges } from '@angular/core';
import { environment } from '../../environments/environment';

const IMG_ENDPOINT = environment.imgEndpoint;

@Component({
  selector: 'he-search-result',
  templateUrl: './search-result.component.html',
  styleUrls: ['./search-result.component.scss']
})
export class SearchResultComponent implements OnInit, OnChanges {

  type: string;
  imagePath: string;
  headline: string;
  description: string;
  detailsPath: string;

  @Input() record: any;
  @Input() recordType: string;
  constructor() { }

  ngOnInit() { }

  ngOnChanges() {
    if (!this.record) { return; }
    this.determineType();
    this.headline = this.getIdentity();
    this.description = this.getDescription();
    this.imagePath = this.getImage();
    this.detailsPath = this.getDetailsPath();
  }

  private determineType() {
    if (this.recordType === 'both') {
      this.type = this.record.media_type ? this.record.media_type : 'person';
    }
    if (this.recordType === 'actor') {
      this.type = 'person';
    }
    if (this.recordType === 'movie') {
      this.type = 'movie';
    }
  }

  private getImage() {
    if (this.type !== 'person') {
      return this.record.poster_path ? IMG_ENDPOINT + '/w200' + this.record.poster_path : '/assets/movie-generic.jpg';
    }
    return this.record.profile_path ? IMG_ENDPOINT  + '/w200' + this.record.profile_path : '/assets/actor-generic.jpg';
  }

    private getDescription() {
      if (this.type !== 'person') {
        return this.record.overview;
      }

      if (this.record.known_for && this.record.known_for.length > 0) {
        return this.record.name + ' is an actor known for their involvement in various shows.';
      } else {
        return this.record.name + ' is an actor, but that\'s all we know.';
      }
    }

    private getDetailsPath() {
      if (this.type === 'person') {
        return '#';
      }
      if (this.type === 'tv') {
        return '#';
      }
      return '/movie/' + this.record.id;
    }

  private getIdentity() {
    if (this.type === 'movie') {
      return this.record.title;
    } else {
      return this.record.name;
    }
  }
}
