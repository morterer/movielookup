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
      map(movies => movies.sort((a, b) => a.name.localeCompare(b.name, undefined, { sensitivity: 'base' })))
    );
  }
}
