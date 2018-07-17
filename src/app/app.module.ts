import { BrowserModule } from '@angular/platform-browser';
import { RouterModule } from '@angular/router';
import { NgModule } from '@angular/core';
import { HttpClientModule } from '@angular/common/http';
import { NgxPaginationModule } from 'ngx-pagination';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { AppComponent } from './app.component';
import { SearchBarComponent } from './search-bar/search-bar.component';
import { SpinnerComponent } from './spinner/spinner.component';
import { MovieRecordComponent } from './movie-record/movie-record.component';
import { MoviePosterComponent } from './movie-poster/movie-poster.component';
import { ActorComponent } from './actor/actor.component';
import { MovieComponent } from './movie/movie.component';
import { SearchComponent } from './search/search.component';
import { TopBarComponent } from './top-bar/top-bar.component';

@NgModule({
  declarations: [
    AppComponent,
    SearchBarComponent,
    SpinnerComponent,
    MovieRecordComponent,
    MoviePosterComponent,
    ActorComponent,
    MovieComponent,
    SearchComponent,
    TopBarComponent
  ],
  imports: [
    BrowserModule,
    RouterModule.forRoot([
      { path: 'search', component: SearchComponent },
      { path: 'actor/:id', component: ActorComponent },
      { path: 'movie/:id', component: MovieComponent },
      { path: '', redirectTo: 'search', pathMatch: 'full' }
    ]),
    HttpClientModule,
    NgxPaginationModule,
    FormsModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
