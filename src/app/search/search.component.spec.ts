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
});
