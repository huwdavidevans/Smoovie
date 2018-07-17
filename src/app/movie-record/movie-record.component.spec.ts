import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { MovieRecordComponent } from './movie-record.component';

describe('MovieRecordComponent', () => {
  let component: MovieRecordComponent;
  let fixture: ComponentFixture<MovieRecordComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ MovieRecordComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(MovieRecordComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
