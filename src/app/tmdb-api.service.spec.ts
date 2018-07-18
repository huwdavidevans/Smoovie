import { TestBed, inject } from '@angular/core/testing';
import { Observable } from 'rxjs';
import { ApiService } from './tmdb-api.service';

import { HttpClientModule, HttpClient } from '@angular/common/http';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';
import { environment } from '../environments/environment.prod';




describe('ApiService', () => {
  let httpMock;
  let apiService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [
        HttpClientTestingModule
      ],
      providers: [ApiService]
    });

    apiService = TestBed.get(ApiService);
    httpMock = TestBed.get(HttpTestingController);
  });

  it('should be created', inject([ApiService], (service: ApiService) => {
    expect(service).toBeTruthy();
  }));


  describe('searchMovies', () => {

    it('should return a result', (done) => {

      const query = 'star wars';
      const filter = 'both';
      const page = 1;

      const expectedUrl = 'https://api.themoviedb.org/3/search/multi?'
        + 'include_adult=false&page=1&query=star%20wars&language=en-US'
        + '&api_key=224cff7f326dbbfde49d42869c0e1f1e';

      const expectedPayload = {
        page: 1,
        results: [
          { title: 'Star Wars' }
        ]
      };

      apiService.searchMovies(query, filter, page)
        .subscribe((data) => {
          expect(data).toBe(expectedPayload);
          done();
        });

      const apiRequest = httpMock.expectOne({ method: 'GET', url: expectedUrl });
      apiRequest.flush(expectedPayload);
      httpMock.verify();

    });

  });

  describe('getPopularMovies', () => {

    it('should return an observable of type Object', () => { });
  });

  describe('getMovieById', () => {

    it('should return an observable of type Object', () => { });
  });

  describe('getActorById', () => {

    it('should return an observable of type Object', () => { });
  });

  describe('getCreditsByMovieId', () => {

    it('should return an observable of type Object', () => { });
  });

  describe('getCreditsByActorId', () => {

    it('should return an observable of type Object', () => { });
  });

  describe('getSimilarMoviesByMovieId', () => {

    it('should return an observable of type Object', () => { });
  });

});
