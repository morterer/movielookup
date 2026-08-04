import { Component, OnInit } from '@angular/core';
import { MovieService, Movie } from './services/movie.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
  title = 'Movie Lookup';
  movies: Movie[] = [];
  loading = true;
  error: string | null = null;

  constructor(private movieService: MovieService) {}

  ngOnInit() {
    this.loadMovies();
  }

  loadMovies() {
    this.loading = true;
    this.error = null;
    this.movieService.getMovies().subscribe({
      next: (movies) => {
        this.movies = movies;
        this.loading = false;
      },
      error: (error) => {
        console.error('Error loading movies:', error);
        this.error = 'Failed to load movies from spreadsheet. Please try again later.';
        this.loading = false;
      }
    });
  }
}
