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
import { MovieComponent } from './movie.component';

describe('MovieComponent', () => {
  let component: MovieComponent;
  let fixture: ComponentFixture<MovieComponent>;

  beforeEach(async(() => {
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
        { provide: APP_BASE_HREF, useValue: '/'}
      ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(MovieComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
