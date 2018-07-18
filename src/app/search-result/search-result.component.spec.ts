import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { SimpleChange } from '@angular/core';

import { BrowserModule } from '@angular/platform-browser';
import { RouterModule } from '@angular/router';
import { APP_BASE_HREF } from '@angular/common';
import { SearchResultComponent } from './search-result.component';

describe('SearchResultComponent', () => {
  let component: SearchResultComponent;
  let fixture: ComponentFixture<SearchResultComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [
        SearchResultComponent,
      ], imports: [
        BrowserModule,
        RouterModule.forRoot([])
      ], providers: [
        { provide: APP_BASE_HREF, useValue: '/'}
      ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SearchResultComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  describe('ngOnInit', () => {

    const myItem = {
      id: 90210,
      title: 'The Machinist',
      poster_path: '/fffff.jpg',
      overview: 'man dem thin.'
    };

    const myFilter = 'movie';


    beforeEach(() => {
      component.item = myItem;
      component.ngOnChanges({
        item: new SimpleChange(null, myItem, true)
      });

      component.filterChoice = myFilter;
      component.ngOnChanges({
        filterChoice: new SimpleChange(null, myFilter, true)
      });

      fixture.detectChanges();
    });

    it('should set imagePath', () => {
      expect(component.imagePath).toBe('http://image.tmdb.org/t/p/w200/fffff.jpg');
    });

    it('should set type', () => {
      expect(component.type).toBe('movie');

    });

    it('should set headline', () => {
      expect(component.headline).toBe('The Machinist');

    });

    it('should set description', () => {
      expect(component.description).toBe('man dem thin.');

    });

    it('should set detailsPath', () => {
      expect(component.detailsPath).toBe('/movie/90210');

    });

    it('should not set linkClass', () => {
      expect(component.linkClass).toBeUndefined();
    });

    it('should set linkClass', () => {
      const myTvShow = {
        name: 'True Detective',
        media_type: 'tv'
      };

      const tvFilter = 'both';

      component.item = myTvShow;
      component.ngOnChanges({
        item: new SimpleChange(null, myTvShow, true)
      });

      component.filterChoice = tvFilter;
      component.ngOnChanges({
        filterChoice: new SimpleChange(null, tvFilter, true)
      });

      fixture.detectChanges();

      expect(component.linkClass).toBe('disabled');

    });

  });

});
