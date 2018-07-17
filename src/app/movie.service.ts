import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs/Observable';
import { environment } from '../environments/environment';

const API_ENDPOINT = environment.apiEndpoint;
const API_KEY = environment.apiKey;

@Injectable({
  providedIn: 'root'
})
export class MovieService {

  filterMap = {
    'both': 'multi',
    'movie': 'movie',
    'actor': 'person'
  };

  constructor(private http: HttpClient) { }


  public getMovies(query: string, filter: string = 'both', page: number): Observable<Object> {
    return this.http.get<Object>(this.buildUrl(query, filter, page));
  }

  private buildUrl(query: string, filter: string, page: number): string {
    return API_ENDPOINT
    + '/3/search/'
    + this.filterMap[filter]
    + '?include_adult=false&page='
    + page
    + '&query='
    + encodeURIComponent(query)
    + '&language=en-US&api_key='
    + API_KEY;
  }
}
