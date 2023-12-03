import {Route} from "@angular/router";
import {MoviesTableComponent} from "./movies-table/movies-table.component";

export const routes: Route[] = [
  {
    path: '',
    component: MoviesTableComponent,
  },
  // {
  //   path: ':id',
  //   component: ProductComponent,
  // },
  {
    path: '**',
    redirectTo: '',
  },
];
