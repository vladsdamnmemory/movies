import {ChangeDetectionStrategy, Component, OnInit} from '@angular/core';
import {BaseComponent} from "../base/base.component";
import {ActivatedRoute} from "@angular/router";
import {MovieMapped, MoviesListService} from "../services/movies-list.service";
import {NgIf} from "@angular/common";
import {DomSanitizer, SafeUrl} from "@angular/platform-browser";
import {ButtonModule} from "primeng/button";
import {TagModule} from "primeng/tag";

@Component({
  selector: 'app-movie-details',
  standalone: true,
  imports: [
    NgIf,
    ButtonModule,
    TagModule
  ],
  templateUrl: './movie-details.component.html',
  styleUrls: ['./movie-details.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class MovieDetailsComponent extends BaseComponent implements OnInit {

  movie: MovieMapped | undefined;

  constructor(private route: ActivatedRoute, private moviesListService: MoviesListService, private sanitizer: DomSanitizer) {
    super();
  }

  ngOnInit(): void {
    const paramName = this.route.snapshot.params['movieName'] as string;
    this.movie = this.moviesListService.retrieveMovies().find((movie) => (paramName === this.moviesListService.encodeMovieUrl(movie)))
  }

  getTrailerUrl(): SafeUrl {
    return this.sanitizer.bypassSecurityTrustResourceUrl(this.movie?.trailer as string);
  }

  addToWatch() {
    this.moviesListService.toggleInWatchList(this.movie as MovieMapped);
  }
}
