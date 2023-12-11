import {Injectable} from '@angular/core';
import {ObjectSorter} from "../lib";
import {LocalStorageAdapter, LocalStorageService} from "./local-storage.service";
import {BaseComponent} from "../base/base.component";

const movieUrlRegExp = /[:\s-]+/g;

export type Movie = {
  title: string;
  description: string;
  rating: string;
  duration: string;
  genre: string;
  released: string;
  trailer: string;
  img: string;
}

export type MovieMapped = {
  releasedDate: number;
  markedForWatch: boolean;
} & Movie;

// Single Responsibility Principle
class WatchList {
  private storage: LocalStorageAdapter;
  private movies: Set<string>;
  private readonly storageKey: string;

  constructor(storage: LocalStorageAdapter) {
    this.storage = storage;
    this.storageKey = 'watchList';
    this.movies = this.loadMovies();
  }

  addMovie(movie: string): void {
    this.movies.add(movie);
    this.saveMovies();
  }

  removeMovie(name: string): void {
    this.movies.delete(name);
    this.saveMovies();
  }

  getMovies(): Set<string> {
    return this.movies;
  }

  // Encapsulation
  private saveMovies(): void {
    // Save as an array
    this.storage.save(this.storageKey, [...this.movies]);
  }

  private loadMovies(): Set<string> {
    // Kill duplicates with Set
    // Save movies to WatchList object
    return this.movies = new Set(this.storage.load(this.storageKey) as string[]);
  }
}


@Injectable({
  providedIn: 'root'
})
export class MoviesListService extends BaseComponent {
  // Original source of movies so far
  // TODO: Interceptor (fake back-end)
  private movies: Array<Movie> = [
    {
      title: 'Tenet',
      description: 'Armed with only one word, Tenet, and fighting for the survival of the entire world, a Protagonist journeys through a twilight world of international espionage on a mission that will unfold in something beyond real time',
      rating: '7.8',
      duration: '2h 30 min',
      genre: 'Action, Sci-Fi',
      released: '3 September 2020',
      trailer: 'https://www.youtube.com/watch?v=LdOM0x0XDMo',
      img: '/assets/img/tenet.png'
    },
    {
      title: 'Spider-Man: Into the Spider-Verse',
      description: 'ATeen Miles Morales becomes the Spider-Man of his universe, and must join with five spider-powered individuals from other dimensions to stop a threat for all realities.',
      rating: '8.4',
      duration: '1h 57min',
      genre: 'Action, Animation, Adventure',
      released: '14 December 2018',
      trailer: 'https://www.youtube.com/watch?v=tg52up16eq0',
      img: '/assets/img/spider_man.png'
    },
    {
      title: 'Knives Out',
      description: 'A detective investigates the death of a patriarch of an eccentric, combative family.',
      rating: '7.9',
      duration: '2h 10min',
      genre: 'Comedy, Crime, Drama',
      released: '27 November 2019',
      trailer: 'https://www.youtube.com/watch?v=qGqiHJTsRkQ',
      img: '/assets/img/knives_out.png'
    },
    {
      title: 'Guardians of the Galaxy',
      description: 'A group of intergalactic criminals must pull together to stop a fanatical warrior with plans to purge the universe.',
      rating: '8.0',
      duration: '2h 1min',
      genre: 'Action, Adventure, Comedy',
      released: '1 August 2014',
      trailer: 'https://www.youtube.com/watch?v=d96cjJhvlMA',
      img: '/assets/img/guardians_of_the_galaxy.png'
    },
    {
      title: 'Avengers: Age of Ultron',
      description: 'When Tony Stark and Bruce Banner try to jump-start a dormant peacekeeping program called Ultron, things go horribly wrong and it\'s up to Earth\'s mightiest heroes to stop the villainous Ultron from enacting his terrible plan.',
      rating: '7.3',
      duration: '2h 21min',
      genre: 'Action, Adventure, Sci-Fi',
      released: '1 May 2015',
      trailer: 'https://www.youtube.com/watch?v=tmeOjFno6Do',
      img: '/assets/img/avengers.png'
    }

  ];

  private readonly watchList: WatchList;

  constructor(private localStorageService: LocalStorageService) {
    super();
    this.watchList = new WatchList(this.localStorageService.getAdapter());
  }

  // TODO: Http request
  // TODO: Interceptor (fake back-end)
  public retrieveMovies(): MovieMapped[] {
    return this.movies.map((item) => ({
      ...item,
      trailer: item.trailer.replace('watch?v=', 'embed/'),
      releasedDate: new Date(item.released).getTime(),
      markedForWatch: this.getWatchList().getMovies().has(item.title)
    }));
  }

  public sortMovies<T>(arr: T[], key: string): T[] {
    return ObjectSorter.sort(arr, key, true);
  }

  public getWatchList(): WatchList {
    return this.watchList;
  }

  public toggleInWatchList(movie: MovieMapped) {
    const watchList = this.getWatchList();

    if (watchList.getMovies().has(movie.title)) {
      watchList.removeMovie(movie.title);
      movie.markedForWatch = false;
    } else {
      watchList.addMovie(movie.title);
      movie.markedForWatch = true;
    }

  }

  public encodeMovieUrl(movie: MovieMapped): string {
    return movie.title.toLowerCase().replace(movieUrlRegExp, '_');
  }
}
