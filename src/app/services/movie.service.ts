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

  private getSortName(name: string): string {
    // Remove leading articles 'a', 'an', 'the' (case-insensitive)
    return name.replace(/^(a|an|the)\s+/i, '');
  }
}
