import {ChangeDetectionStrategy, Component, OnInit} from '@angular/core';
import {MovieThumbnailComponent} from "../movie-thumbnail/movie-thumbnail.component";
import {NgForOf} from "@angular/common";
import {BaseComponent} from "../base/base.component";
import {MovieMapped, MoviesListService} from "../services/movies-list.service";
import {DropdownChangeEvent, DropdownModule} from "primeng/dropdown";
import {FormsModule} from "@angular/forms";
import {Option} from "../lib";
import {Router} from "@angular/router";

@Component({
  selector: 'app-movies-table',
  templateUrl: './movies-table.component.html',
  styleUrls: ['./movies-table.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [
    MovieThumbnailComponent,
    NgForOf,
    DropdownModule,
    FormsModule
  ],
  standalone: true
})
export class MoviesTableComponent extends BaseComponent implements OnInit {

  movies: MovieMapped[] = [];

  sortingOptions: Option[] = [
    {label: 'Release Date', value: 'releasedDate'},
    {label: 'Rating', value: 'rating'},
    {label: 'Title', value: 'title'},
  ];

  selectedSortedOption = 'rating'; // Default sorting criteria

  constructor(private moviesListService: MoviesListService, private router: Router) {
    super();
  }

  ngOnInit(): void {
    this.movies = this.moviesListService.retrieveMovies();
    // Sort at start
    this.sort({value: this.selectedSortedOption, originalEvent: new Event('click')});
  }

  // TODO: minimize violating server in future by caching movies
  sort(event: DropdownChangeEvent) {
    if (event.value) {
      this.movies = this.moviesListService.sortMovies(this.moviesListService.retrieveMovies(), event.value)
    } else {
      this.movies = this.moviesListService.retrieveMovies();
    }
  }

  watchLater(movie: MovieMapped) {
    this.moviesListService.toggleInWatchList(movie);
  }

  goToMoviePage(movie: MovieMapped) {
    this.router.navigate(['movie', this.moviesListService.encodeMovieUrl(movie)]).then();
  }
}
