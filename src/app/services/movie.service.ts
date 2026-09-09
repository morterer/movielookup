import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, map } from 'rxjs';

export interface Movie {
  type: string;
  data: string;
  name: string;
  cover_art_url: string;
}

@Injectable({
  providedIn: 'root'
})
export class MovieService {
  constructor(private http: HttpClient) {}

  getMovies(): Observable<Movie[]> {
    return this.http.get<Movie[]>('assets/data.json').pipe(
      map(movies => movies.sort((a, b) => 
        this.getSortName(a.name).localeCompare(this.getSortName(b.name), undefined, { sensitivity: 'base' })
      ))
    );
  }

  searchMovies(movies: Movie[], query: string): Movie[] {
    if (!query.trim()) {
      return movies;
    }
    
    const searchTerm = query.toLowerCase().trim();
    return movies.filter(movie =>
      movie.name.toLowerCase().includes(searchTerm) ||
      movie.data.toLowerCase().includes(searchTerm)
    );
  }

  private getSortName(name: string): string {
    // Remove leading articles 'a', 'an', 'the' (case-insensitive)
    return name.replace(/^(a|an|the)\s+/i, '');
  }
}
