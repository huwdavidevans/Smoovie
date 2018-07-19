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

describe('SearchComponent', () => {
  let component: SearchComponent;
  let fixture: ComponentFixture<SearchComponent>;

  beforeEach(async(() => {
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
        { provide: APP_BASE_HREF, useValue: '/'}
      ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SearchComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
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

    it('should update query', () => {
      component.updateSearch(searchModel);
      expect(component.query).toBe(searchModel.searchTerm);
    });

    it('should update filter', () => {
      component.updateSearch(searchModel);
      expect(component.filter).toBe(searchModel.filter);
    });

    it('should update gotoPage', () => {
      spyOn(component, 'goToPage');
      component.updateSearch(searchModel);
      expect(component.goToPage).toHaveBeenCalled();
    });

  });


});
