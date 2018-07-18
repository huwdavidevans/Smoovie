import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { FormsModule } from '@angular/forms';
import { BrowserModule } from '@angular/platform-browser';
import { APP_BASE_HREF } from '@angular/common';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { SearchBarComponent } from './search-bar.component';

describe('SearchBarComponent', () => {
  let component: SearchBarComponent;
  let fixture: ComponentFixture<SearchBarComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [
        SearchBarComponent
      ], imports: [
        BrowserModule,
        FormsModule,
        HttpClientTestingModule
      ], providers: [
        { provide: APP_BASE_HREF, useValue: '/'}
      ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SearchBarComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  describe('submit', () => {

    it('should emit the model', () => {
      spyOn(component.searchChange, 'emit');
      component.model.searchTerm = 'Ray Romano';
      component.model.filter = 'actor';
      component.submit(null);
      expect(component.searchChange.emit).toHaveBeenCalledWith({ searchTerm: 'Ray Romano', filter: 'actor' });
    });

    it('should emit the model', () => {
      spyOn(component.searchChange, 'emit');
      component.model.searchTerm = 'Holy Mountain';
      component.model.filter = 'movie';
      component.submit(new Event('test'));
      expect(component.searchChange.emit).toHaveBeenCalledWith({ searchTerm: 'Holy Mountain', filter: 'movie' });
    });

    it('should preventDefault on the event', () => {
      spyOn(component.searchChange, 'emit');
      component.model.searchTerm = 'Holy Mountain';
      component.model.filter = 'movie';
      component.submit({
        preventDefault: () => {
          expect(true);
      }});
    });

  });
});
