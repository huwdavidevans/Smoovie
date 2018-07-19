import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SearchBarComponent } from '../search-bar/search-bar.component';
import { SearchResultComponent } from '../search-result/search-result.component';
import { SpinnerComponent } from '../spinner/spinner.component';
import { ErrorStateComponent } from '../error-state/error-state.component';
import { MoviePosterComponent } from '../movie-poster/movie-poster.component';
import { FormsModule } from '@angular/forms';
import { BrowserModule } from '@angular/platform-browser';
import { RouterModule } from '@angular/router';
import { APP_BASE_HREF } from '@angular/common';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { SearchComponent } from './search.component';
import { NgxPaginationModule } from 'ngx-pagination';

import { Observable, throwError } from 'rxjs';
import 'rxjs/add/observable/of';
import { ApiService } from '../tmdb-api.service';

describe('SearchComponent', () => {
  let component: SearchComponent;
  let fixture: ComponentFixture<SearchComponent>;
  let apiService;

  beforeEach(async(() => {

    apiService = jasmine.createSpyObj('ApiService', ['searchMovies', 'getPopularMovies']);

    TestBed.configureTestingModule({
      declarations: [
        SearchBarComponent,
        SearchResultComponent,
        SearchComponent,
        SpinnerComponent,
        ErrorStateComponent,
        MoviePosterComponent
      ], imports: [
        BrowserModule,
        RouterModule.forRoot([]),
        FormsModule,
        HttpClientTestingModule,
        NgxPaginationModule
      ], providers: [
        { provide: ApiService, useValue: apiService },
        { provide: APP_BASE_HREF, useValue: '/'}
      ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SearchComponent);
    component = fixture.componentInstance;
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  describe('ngOnInit', () => {

    it('should call the discover page method', () => {
      spyOn(component, 'goToDiscoverPage');
      component.ngOnInit();
      expect(component.goToDiscoverPage).toHaveBeenCalled();
    });

  });

  describe('updateSearch', () => {

    const searchModel = {
      searchTerm: 'Stephen Toast',
      filter: 'actor'
    };

    beforeEach(() => {
      spyOn(component, 'goToPage');
    });

    it('should update query', () => {
      component.updateSearch(searchModel);
      expect(component.query).toEqual(searchModel.searchTerm);
    });

    it('should update filter', () => {
      component.updateSearch(searchModel);
      expect(component.filter).toEqual(searchModel.filter);
    });

    it('should update gotoPage', () => {
      component.updateSearch(searchModel);
      expect(component.goToPage).toHaveBeenCalled();
    });

  });

  describe('goToPage', () => {

    let searchSpy;
    const expectedMovies = { results: [{ title: 'Star Wars' }, { title: 'Krull' }, { title: 'Silent Running' }] };

    beforeEach(() => {
      searchSpy = apiService.searchMovies.and.callFake(() => {
        return Observable.of(expectedMovies);
      });
      component.query = 'Stephen Toast',
        component.filter = 'actor';
    });

    it('should set state as loaded', () => {
      component.goToPage();
      expect(component.state).toBe('loaded');
    });

    it('should set state as error', () => {
      searchSpy = apiService.searchMovies.and.callFake(() => {
        return throwError('Error');
      });
      component.goToPage();
      expect(component.state).toBe('error');
    });

    it('should set data', () => {
      component.goToPage();
      expect(component.data).toEqual(expectedMovies);
    });

  });

  describe('goToDiscoverPage', () => {

    let discoverSpy;
    const expectedMovies = { results: [{ title: 'Star Wars' }, { title: 'Krull' }, { title: 'Silent Running' }] };

    beforeEach(() => {
      discoverSpy = apiService.getPopularMovies.and.callFake(() => {
        return Observable.of(expectedMovies);
      });
    });

    it('should set state as loaded', () => {
      component.goToDiscoverPage();
      expect(component.state).toBe('discoverLoaded');
    });

    it('should set state as error', () => {
      discoverSpy = apiService.getPopularMovies.and.callFake(() => {
        return throwError('Error');
      });
      component.goToDiscoverPage();
      expect(component.state).toBe('error');
    });

    it('should set data', () => {
      component.goToDiscoverPage();
      expect(component.discoverResults).toEqual(expectedMovies.results);
    });

  });


});
