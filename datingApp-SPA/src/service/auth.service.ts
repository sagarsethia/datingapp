import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { map } from 'rxjs/Operators';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  baseUrl = 'http://localhost:5000/login/';
  constructor(private http: HttpClient) { }

  login(userModel: any): Observable<any> {
    return this.http.post(this.baseUrl + 'login', userModel).pipe(
      map((response) => {
        const user = response;
        if (user) {
          // tslint:disable-next-line: no-string-literal
          localStorage.setItem('token', user['tokenString']);
        }
      }, error => { console.log(error); })
    );
  }

  register(registerModel: any) {
    return this.http.post(this.baseUrl + 'register', registerModel).subscribe((res) => {
      console.log('user successfully register')
    }, error => { console.log(error);
  });
}
}
