import {Route} from "@angular/router";
import {MoviesTableComponent} from "./movies-table/movies-table.component";
import {WatchListComponent} from "./watch-list/watch-list.component";
import {MovieDetailsComponent} from "./movie-details/movie-details.component";

export const routes: Route[] = [
  {
    path: '',
    component: MoviesTableComponent,
  },

  {
    path: 'watchlist',
    component: WatchListComponent,
  },

  {
    path: 'movie/:movieName',
    component: MovieDetailsComponent,
  },

  {
    path: '**',
    redirectTo: '',
  },
];
