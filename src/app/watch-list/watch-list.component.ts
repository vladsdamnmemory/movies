import {ChangeDetectionStrategy, Component, OnInit} from '@angular/core';
import {BaseComponent} from "../base/base.component";
import {MovieMapped, MoviesListService} from "../services/movies-list.service";
import {CardModule} from "primeng/card";
import {NgForOf, NgIf} from "@angular/common";
import {MovieThumbnailComponent} from "../movie-thumbnail/movie-thumbnail.component";
import {Router} from "@angular/router";

@Component({
  selector: 'app-watch-list',
  standalone: true,
  imports: [
    CardModule,
    NgForOf,
    MovieThumbnailComponent,
    NgIf
  ],
  templateUrl: './watch-list.component.html',
  styleUrls: ['./watch-list.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class WatchListComponent extends BaseComponent implements OnInit {
  public postponedMovies: MovieMapped[] = [];

  constructor(private moviesListService: MoviesListService, private router: Router) {
    super();
  }

  ngOnInit(): void {
    this.updateList();
  }

  public toggleMovieVisibility(movie: MovieMapped): void {
    this.moviesListService.toggleInWatchList(movie);
    this.updateList();
  }

  goToMoviePage(movie: MovieMapped) {
    this.router.navigate(['movie', this.moviesListService.encodeMovieUrl(movie)]).then();
  }

  private updateList(): void {
    this.postponedMovies = this.moviesListService.retrieveMovies().filter((m) => {
      return this.moviesListService.getWatchList().getMovies().has(m.title)
    });
  }
}
