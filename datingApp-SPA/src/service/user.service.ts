import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { AlertifyService } from './alertify.service';
import { Observable } from 'rxjs';
import { User } from 'src/app/model/user.interface';


@Injectable({
  providedIn: 'root'
})
export class UserService {
  baseUrl = 'https://localhost:5001/api/';
  constructor(private http: HttpClient, private alertifyJs: AlertifyService) {}

   getAllUser(): Observable<User[]> {
    return this.http.get<User[]>(this.baseUrl + 'user');
  }
  getUser(id: number): Observable<User> {
    return this.http.get<User>(this.baseUrl + 'user/' + id);
  }
  saveUser(id: number, user: User): Observable<User> {
    return this.http.put<User>(this.baseUrl + 'user/' + id, user);
  }
}
