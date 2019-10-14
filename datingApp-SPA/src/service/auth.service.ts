import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { map } from 'rxjs/Operators';
import { Observable } from 'rxjs';
import { JwtHelperService } from '@auth0/angular-jwt';
import { AlertifyService } from './alertify.service';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  baseUrl = ' https://localhost:5001/api/';
  constructor(private http: HttpClient, private alertifyJs: AlertifyService, private route: Router) { }
  JwtHelperService: JwtHelperService = new JwtHelperService();
  login(userModel: any): Observable<any> {
    return this.http.post(this.baseUrl + 'auth/login', userModel).pipe(
      map((response) => {
        const user = response;
        if (user) {
          // tslint:disable-next-line: no-string-literal
          localStorage.setItem('token', user['tokenString']);
          this.alertifyJs.success('User Logged In Successfully');
        }
      }, error => {  this.alertifyJs.success('Error in Logging In'); })
    );
  }

  isUserLoggedIn(): boolean {
    const token = localStorage.getItem('token');
    if (token != null) {
      return this.JwtHelperService.isTokenExpired(token) ? true : false;
    }
    return false;
  }

  register(registerModel: any) {
    return this.http.post(this.baseUrl + 'auth/register', registerModel).subscribe((res) => {
      this.alertifyJs.success('User Register Successfully');
      this.route.navigate(['home']);
    }, error => { this.alertifyJs.error('Error in user registration');
  });
}
}
