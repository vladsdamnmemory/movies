import {ChangeDetectionStrategy, Component} from '@angular/core';
import {MovieThumbnailComponent} from "../movie-thumbnail/movie-thumbnail.component";
import {NgForOf} from "@angular/common";
import {BaseComponent} from "../base/base.component";

@Component({
  selector: 'app-movies-table',
  templateUrl: './movies-table.component.html',
  styleUrls: ['./movies-table.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [
    MovieThumbnailComponent,
    NgForOf
  ],
  standalone: true
})
export class MoviesTableComponent extends BaseComponent {

}
