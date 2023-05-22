import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { map, tap } from 'rxjs/operators';

export interface Category {
  id: number;
  title: string;
  image_src: string;
  date: string;
  address: string;
  content: string;
}

export interface SearchResult {
  id: number;
  title: string;
  image_src: string;
  date: string;
  address: string;
  content: string;
}

export interface FilterValues {
  searchTerm: string;
  category: string[];
}

@Injectable({
  providedIn: 'root',
})
export class DataService {
  private categoryUrl = 'http://localhost:8000/vilniusEvents/';
  searchTerm: string = '';
  category: string[] = [];

  constructor(private http: HttpClient) {}

  search(searchTerm: string, categoryName: string): Observable<SearchResult[]> {
    const params = new HttpParams().set('q', searchTerm);
    return this.http.get<SearchResult[]>(this.categoryUrl, { params }).pipe(
      map((results) =>
        results.filter((result) =>
          (categoryName.length === 0 || result.title.includes(categoryName)) &&
          result.title.toLowerCase().includes(searchTerm.toLowerCase())
        )
      )
    );
  }

  getAllData(): Observable<SearchResult[]> {
    return this.http.get<SearchResult[]>(this.categoryUrl).pipe(
      tap((response) => {
        console.log('getAllData response:', response);
      })
    );
  }

  getResultDetails(id: number): Observable<Category> {
    return this.http.get<Category>(`${this.categoryUrl}/${id}`);
  }

  getCategories(): Observable<Category[]> {
    return this.http.get<Category[]>(`${this.categoryUrl}`);
  }

  getResults(): Observable<SearchResult[]> {
    return this.http.get<SearchResult[]>(this.categoryUrl);
  }

  applyFilter(filterValues: FilterValues): Observable<SearchResult[]> {
    return this.getResults().pipe(
      map((results) =>
        results.filter(
          (result) =>
            (filterValues.searchTerm.length === 0 ||
              result.title.toLowerCase().includes(filterValues.searchTerm.toLowerCase())) &&
            (filterValues.category.length === 0 ||
              filterValues.category.some((categoryName) =>
                result.title.includes(categoryName)
              ))
        )
      )
    );
  }

  filterResultsByKeywords(keywords: string[], results: SearchResult[]): SearchResult[] {
    return results.filter(result =>
      keywords.every(keyword =>
        result.title.toLowerCase().includes(keyword.toLowerCase())
      )
    );
  }
  
}
