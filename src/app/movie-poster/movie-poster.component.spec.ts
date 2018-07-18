import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { SimpleChange } from '@angular/core';
import { MoviePosterComponent } from './movie-poster.component';

describe('MoviePosterComponent', () => {
  let component: MoviePosterComponent;
  let fixture: ComponentFixture<MoviePosterComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ MoviePosterComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(MoviePosterComponent);
    component = fixture.componentInstance;
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  describe('ngOnChanges', () => {

    const myMovie = {
      id: 90210,
      title: 'The Towering Inferno',
      poster_path: '/fffff.jpg'
    };

    beforeEach(() => {
      component.movie = myMovie;
      component.ngOnChanges({
        movie: new SimpleChange(null, myMovie, true)
      });
      fixture.detectChanges();
    });

    it('should set id', () => {
      expect(component.id).toEqual(90210);
    });

    it('should set imagePath', () => {
      expect(component.imagePath).toEqual('http://image.tmdb.org/t/p/w200/fffff.jpg');
    });

    it('should set movieTitle', () => {
      expect(component.movieTitle).toEqual('The Towering Inferno');
    });

  });

});
