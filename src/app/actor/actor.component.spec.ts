import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ActorComponent } from './actor.component';
import { TopBarComponent } from '../top-bar/top-bar.component';
import { SpinnerComponent } from '../spinner/spinner.component';
import { ErrorStateComponent } from '../error-state/error-state.component';
import { MomentModule } from 'angular2-moment';
import { BrowserModule } from '@angular/platform-browser';
import { RouterModule } from '@angular/router';
import { APP_BASE_HREF } from '@angular/common';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { ActivatedRoute } from '@angular/router';

import { Observable, throwError } from 'rxjs';
import 'rxjs/add/observable/of';
import { ApiService } from '../tmdb-api.service';

describe('ActorComponent', () => {
  let component: ActorComponent;
  let fixture: ComponentFixture<ActorComponent>;
  let apiService;

  beforeEach(async(() => {

    apiService = jasmine.createSpyObj('ApiService', ['getActorById', 'getCreditsByActorId']);

    TestBed.configureTestingModule({
      declarations: [
        ActorComponent,
        TopBarComponent,
        SpinnerComponent,
        ErrorStateComponent,
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
    fixture = TestBed.createComponent(ActorComponent);
    component = fixture.componentInstance;
    apiService = TestBed.get(ApiService);
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  describe('ngOnInit', () => {
    let actorSpy;
    let creditsSpy;

    const expectedDetails = {
      birthday: '1969-04-06',
      known_for_department: 'Acting',
      deathday: null,
      id: 22226,
      name: 'Paul Rudd',
      biography: 'Paul Stephen Rudd (born April 6, 1969) is an American actor.',
      place_of_birth: 'Passaic, New Jersey, USA',
      profile_path: '/8eTtJ7XVXY0BnEeUaSiTAraTIXd.jpg',
      homepage: null
    };

    const expectedCredits = {
      'cast': [
        {
          character: 'Dave Paris',
          poster_path: '/6VsRWzhx9i3FNcggVrNwYLMUdxa.jpg',
          id: 454,
          genre_ids: [
            18,
            10749
          ],
          title: 'Romeo + Juliet',
          overview: 'Baz Luhrmann\'s contemporary take on William Shakespeare\'s classic tragedy',
          release_date: '1996-11-01'
        }
      ],
      'crew': [
        {
          id: 15373,
          department: 'Writing',
          job: 'Screenplay',
          release_date: '2008-11-07',
          title: 'Role Models',
          poster_path: '/bq6wxu0rv1GIkEwslBT2rVgLkxe.jpg'
        }
      ],
      'id': 22226
    };

    beforeEach(() => {
      actorSpy = apiService.getActorById.and.callFake(() => {
        return Observable.of(expectedDetails);
      });

      creditsSpy = apiService.getCreditsByActorId.and.callFake(() => {
        return Observable.of(expectedCredits);
      });
    });

    it('should set the actor details', () => {
      component.ngOnInit();
      expect(component.details).toEqual(expectedDetails);
    });

    it('should set the imagePath for the actor', () => {
      component.ngOnInit();
      expect(component.imagePath).toEqual('http://image.tmdb.org/t/p/w400/8eTtJ7XVXY0BnEeUaSiTAraTIXd.jpg');
    });

    it('should set the state to loaded', () => {
      component.ngOnInit();
      expect(component.state).toEqual('loaded');
    });

    it('should set the state to error', () => {
      actorSpy = apiService.getActorById.and.callFake(() => {
        return throwError('Error');
      });
      component.ngOnInit();
      expect(component.state).toEqual('error');
    });

    it('should set the actor details', () => {
      component.ngOnInit();
      const credits = { state: 'loaded', cast: expectedCredits.cast, crew: expectedCredits.crew };
      expect(component.credits).toEqual(credits);
    });

  });

});
