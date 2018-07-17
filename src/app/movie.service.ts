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

  public searchMovieDb(query: string, filter: string = 'both', page: number = 1): Observable<Object> {
    return this.http.get<Object>(this.buildSearchUrl(query, filter, page));
  }

  private buildSearchUrl(query: string, filter: string, page: number ): string {
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

  public getPopularMovieDb(page: number = 1): Observable<Object> {
    return this.http.get<Object>(this.buildPopularMoviesUrl(page));
  }

  private buildPopularMoviesUrl(page: number): string {
    return API_ENDPOINT
      + '/3/discover/movie?api_key='
      + API_KEY
      + '&language=en-US&sort_by=popularity.desc&include_adult=false&include_video=false&page='
      + page;
  }

  public getMovieById(id: number) {
    return this.http.get<Object>(this.buildGetMovieByIdUrl(id));
  }

  private buildGetMovieByIdUrl(id: number): string {
    return API_ENDPOINT
      + '/3/movie/'
      + id
      + '?api_key='
      + API_KEY
      + '&language=en-US';
  }
}
