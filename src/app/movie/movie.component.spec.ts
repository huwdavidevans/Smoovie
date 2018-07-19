import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { TopBarComponent } from '../top-bar/top-bar.component';
import { SpinnerComponent } from '../spinner/spinner.component';
import { ErrorStateComponent } from '../error-state/error-state.component';
import { MoviePosterComponent } from '../movie-poster/movie-poster.component';
import { MomentModule } from 'angular2-moment';
import { BrowserModule } from '@angular/platform-browser';
import { RouterModule } from '@angular/router';
import { APP_BASE_HREF } from '@angular/common';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { ActivatedRoute } from '@angular/router';
import { MovieComponent } from './movie.component';

import { Observable, throwError } from 'rxjs';
import 'rxjs/add/observable/of';
import { ApiService } from '../tmdb-api.service';

describe('MovieComponent', () => {
  let component: MovieComponent;
  let fixture: ComponentFixture<MovieComponent>;
  let apiService;

  beforeEach(async(() => {

    apiService = jasmine.createSpyObj('ApiService', ['getMovieById', 'getCreditsByMovieId', 'getSimilarMoviesByMovieId']);

    TestBed.configureTestingModule({
      declarations: [
        MovieComponent,
        TopBarComponent,
        SpinnerComponent,
        ErrorStateComponent,
        MoviePosterComponent
      ], imports: [
        BrowserModule,
        RouterModule.forRoot([]),
        MomentModule,
        HttpClientTestingModule
      ], providers: [
        { provide: ApiService, useValue: apiService },
        { provide: APP_BASE_HREF, useValue: '/' },
        {
          provide: ActivatedRoute,
          useValue: {snapshot: {params: {'id': '90210'}}}
        }
      ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(MovieComponent);
    component = fixture.componentInstance;
    apiService = TestBed.get(ApiService);
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  describe('ngOnInit', () => {
    let movieSpy;
    let creditsSpy;
    let similarMoviesSpy;

    const expectedDetails = {
      'genres': [
        {
          'id': 35,
          'name': 'Comedy'
        }
      ],
      'homepage': null,
      'id': 8699,
      'poster_path': '/hafNeozn8Q4K6enP2ux5MTMCHjH.jpg',
      'release_date': '2004-07-09',
      'tagline': 'They bring you the news so you don\'t have to get it yourself.',
      'title': 'Anchorman: The Legend of Ron Burgundy'
    };

    const expectedCredits = {
      'id': 8699,
      'cast': [
        {
          'character': 'Ron Burgundy',
          'credit_id': '52fe44b5c3a36847f80a59e3',
          'name': 'Will Ferrell',
          'profile_path': '/dGxt3uGPlUJKIfHYiLasnEgR90e.jpg'
        }
      ],
      'crew': [
        {
          'department': 'Directing',
          'job': 'Director',
          'name': 'Adam McKay',
          'profile_path': '/pwc6pHC5d3y8NVsphURkKK8y2fL.jpg'
        }
      ]
    };

    const similarMovies = { results: [{ title: 'Star Wars' }, { title: 'Krull' }, { title: 'Silent Running' }] };

    beforeEach(() => {
      movieSpy = apiService.getMovieById.and.callFake(() => {
        return Observable.of(expectedDetails);
      });

      creditsSpy = apiService.getCreditsByMovieId.and.callFake(() => {
        return Observable.of(expectedCredits);
      });

      similarMoviesSpy = apiService.getSimilarMoviesByMovieId.and.callFake(() => {
        return Observable.of(similarMovies);
      });
    });

    it('should set the movie details', () => {
      component.ngOnInit();
      expect(component.details).toEqual(expectedDetails);
    });

    it('should set the imagePath for the movie', () => {
      component.ngOnInit();
      expect(component.imagePath).toEqual('http://image.tmdb.org/t/p/w400/hafNeozn8Q4K6enP2ux5MTMCHjH.jpg');
    });

    it('should set the state to loaded', () => {
      component.ngOnInit();
      expect(component.state).toEqual('loaded');
    });

    it('should set the state to error', () => {
      movieSpy = apiService.getMovieById.and.callFake(() => {
        return throwError('Error');
      });
      component.ngOnInit();
      expect(component.state).toEqual('error');
    });

    it('should set the movie details', () => {
      component.ngOnInit();
      const credits = { state: 'loaded', cast: expectedCredits.cast, crew: expectedCredits.crew };
      expect(component.credits).toEqual(credits);
    });

    it('should set the similar movies', () => {
      component.ngOnInit();
      const expectedSimilarMovies = { state: 'loaded', movies: similarMovies.results };
      expect(component.similarMovies).toEqual(expectedSimilarMovies);
    });

  });
});
