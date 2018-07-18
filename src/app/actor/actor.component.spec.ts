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

describe('ActorComponent', () => {
  let component: ActorComponent;
  let fixture: ComponentFixture<ActorComponent>;

  beforeEach(async(() => {
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
        { provide: APP_BASE_HREF, useValue: '/'}
      ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ActorComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
