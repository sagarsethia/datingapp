import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { AlertifyService } from './alertify.service';
import { Observable } from 'rxjs';
import { User } from 'src/app/model/user.interface';
import {PaginatedResult} from 'src/app/model/Pagination.interface';
import { map } from 'rxjs/Operators';


@Injectable({
  providedIn: 'root'
})
export class UserService {
  baseUrl = 'https://localhost:5001/api/';
  constructor(private http: HttpClient, private alertifyJs: AlertifyService) {}

  getAllUser(pageNumber?, pageSize?): Observable<PaginatedResult<User[]>> {
    const paginatedResult: PaginatedResult<User[]> = new PaginatedResult<User[]>();
    let userParam = new HttpParams();
    if (pageNumber != null && pageSize != null) {
      userParam = userParam.append('PageNumber', pageNumber);
      userParam = userParam.append('PageSize', pageSize);
    }
    return this.http.get<User[]>(this.baseUrl + 'user', {observe: 'response', params: userParam})
   .pipe(
     map(r => {
       paginatedResult.result = r.body;
       if (r.headers.get('paginationheader') != null) {
           paginatedResult.pagination = JSON.parse(r.headers.get('paginationheader'));
       }
       return paginatedResult;
      }
     )
    );
  }
  getUser(id: number): Observable<User> {
    return this.http.get<User>(this.baseUrl + 'user/' + id);
  }
  saveUser(id: number, user: User): Observable<User> {
    return this.http.put<User>(this.baseUrl + 'user/' + id, user);
  }
}
