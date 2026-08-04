import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, map } from 'rxjs';

export interface Movie {
  upc: string;
  name: string;
  coverArtUrl: string;
}

@Injectable({
  providedIn: 'root'
})
export class MovieService {
  private readonly SHEET_ID = '1m5q42gHCDXXKICGzk3Mz94hnc3vWXB4awaOjLgqSiuM';
  private readonly SHEET_CSV_URL = `https://docs.google.com/spreadsheets/d/${this.SHEET_ID}/export?format=csv`;

  constructor(private http: HttpClient) {}

  getMovies(): Observable<Movie[]> {
    return this.http.get(this.SHEET_CSV_URL, { responseType: 'text' }).pipe(
      map(csvData => this.parseCSV(csvData))
    );
  }

  private parseCSV(csvData: string): Movie[] {
    const lines = csvData.split('\n').filter(line => line.trim());
    const movies: Movie[] = [];

    // Skip header row and parse data (columns B, C, D are indices 1, 2, 3)
    for (let i = 1; i < lines.length; i++) {
      const columns = this.parseCSVLine(lines[i]);
      if (columns.length > 3) {
        const upc = columns[1]?.trim() || '';
        const name = columns[2]?.trim() || '';
        const coverArtUrl = columns[3]?.trim() || '';

        // Only add if we have at least a name
        if (name) {
          movies.push({ upc, name, coverArtUrl });
        }
      }
    }

    return movies.sort((a, b) => a.name.localeCompare(b.name, undefined, { sensitivity: 'base' }));
  }

  private parseCSVLine(line: string): string[] {
    const result: string[] = [];
    let current = '';
    let insideQuotes = false;

    for (let i = 0; i < line.length; i++) {
      const char = line[i];
      const nextChar = line[i + 1];

      if (char === '"') {
        if (insideQuotes && nextChar === '"') {
          // Escaped quote
          current += '"';
          i++;
        } else {
          // Toggle quote state
          insideQuotes = !insideQuotes;
        }
      } else if (char === ',' && !insideQuotes) {
        // Column separator
        result.push(current);
        current = '';
      } else {
        current += char;
      }
    }

    result.push(current);
    return result;
  }
}
