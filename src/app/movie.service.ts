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

  constructor(private http: HttpClient) { }

  public getMovies(query: string = 'star wars', page: number = 1): Observable<Object> {
    const getMoviesRequest =
      API_ENDPOINT
      + '/3/search/movie?include_adult=false&page='
      + page
      + '&query='
      + encodeURIComponent(query)
      + '&language=en-US&api_key='
      + API_KEY;

    return this.http.get<Object>(getMoviesRequest);
  }
}
