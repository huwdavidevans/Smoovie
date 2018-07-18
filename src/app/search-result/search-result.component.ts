import { Component, OnInit, Input, OnChanges } from '@angular/core';
import { environment } from '../../environments/environment';

import * as _ from 'lodash';
import * as moment from 'moment';

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
  linkClass: string;

  @Input() item: any;
  @Input() filterChoice: string;
  constructor() { }

  ngOnInit() { }

  ngOnChanges(changes: any) {
    if (!this.item) { return; }
    this.determineType();
    this.headline = this.getIdentity();
    this.description = this.getDescription();
    this.imagePath = this.getImage();
    this.detailsPath = this.getDetailsPath();
  }

  private determineType() {
    if (this.filterChoice === 'both') {
      this.type = this.item.media_type ? this.item.media_type : 'person';
    }
    if (this.filterChoice === 'actor') {
      this.type = 'person';
    }
    if (this.filterChoice === 'movie') {
      this.type = 'movie';
    }

    if (this.type === 'tv') {
      this.linkClass = 'disabled';
    }
  }

  private getImage() {
    if (this.type !== 'person') {
      return this.item.poster_path ? IMG_ENDPOINT + '/w200' + this.item.poster_path : '/assets/movie-generic.jpg';
    }
    return this.item.profile_path ? IMG_ENDPOINT + '/w200' + this.item.profile_path : '/assets/actor-generic.jpg';
  }

  private getDescription() {
    if (this.type !== 'person') {
      return this.item.overview;
    }

    if (this.item.known_for && this.item.known_for.length > 0) {
      return this.item.name + ' is an actor known for their involvement in ' + this.getActorCredits().join(', ');
    } else {
      return this.item.name + ' is an actor, but that\'s all we know.';
    }
  }

  private getActorCredits(): Array<String> {
    return _.map(this.item.known_for, (credit: any) => {
      const titleSelector = (credit.media_type === 'tv') ? 'name' : 'title';
      const dateSelector = (credit.media_type === 'tv') ? 'first_air_date' : 'release_date';
      return `${credit[titleSelector]} (${moment(credit[dateSelector]).format('YYYY')})`;
    });
  }

  private getDetailsPath() {
    if (this.type === 'person') {
      return '/actor/' + this.item.id;
    }
    if (this.type === 'tv') {
      return '#';
    }
    return '/movie/' + this.item.id;
  }

  private getIdentity() {
    if (this.type === 'movie') {
      return this.item.title;
    } if (this.type === 'tv') {
      return `${this.item.name} (TV)`;
    } else {
      return this.item.name;
    }
  }
}
