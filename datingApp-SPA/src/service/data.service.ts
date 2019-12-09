import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { map } from 'rxjs/Operators';


@Injectable({
  providedIn: 'root'
})
export class DataService {
  constructor(private http: HttpClient) {}

  getCountryList(): Observable<any> {
    return this.http.get<any>('https://restcountries.eu/rest/v2/all').pipe(
      map(res => {
        const items = [];
        Object.keys(res).forEach((key) => {
            items.push({ name: res[key].name, value: res[key].name });
        });
        return items;
      })
    );
  }
}
