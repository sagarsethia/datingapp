import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { map } from 'rxjs/Operators';
import { Observable, BehaviorSubject, Subject } from 'rxjs';
import { JwtHelperService } from '@auth0/angular-jwt';
import { AlertifyService } from './alertify.service';
import { Router } from '@angular/router';
import { User } from 'src/app/model/user.interface';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  baseUrl = 'https://localhost:5001/api/';
  userProfilePic = new BehaviorSubject<string>('../assets/user.png');
  currentPhotoUrl = this.userProfilePic.asObservable();
  constructor(
    private http: HttpClient,
    private alertifyJs: AlertifyService,
    private route: Router
  ) {}
  JwtHelperService: JwtHelperService = new JwtHelperService();
  decodedToken: any;

  changeProfilePic(imgSrc) {
    this.userProfilePic.next(imgSrc);
    localStorage.setItem('profilePic', imgSrc);
  }

  login(userModel: any): Observable<any> {
    return this.http.post(this.baseUrl + 'auth/login', userModel).pipe(
      map(
        response => {
          const user = response;
          if (user) {
            this.decodedToken = this.JwtHelperService.decodeToken(
              // tslint:disable-next-line: no-string-literal
              user['tokenString']
            );
            // tslint:disable-next-line: no-string-literal
            const userProfile = response['mappedUser'];
            const profilePicUrl =
              userProfile.url === null ? '../assets/user.png' : userProfile.url;
            this.changeProfilePic(profilePicUrl);
            localStorage.setItem(
              'profilePic',
              profilePicUrl
            );
            localStorage.setItem('token', user['tokenString']);
            this.alertifyJs.success('User Logged In Successfully');
          }
        },
        error => {
          this.alertifyJs.success('Error in Logging In');
        }
      )
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
    return this.http
      .post(this.baseUrl + 'auth/register', registerModel)
      .subscribe(
        res => {
          this.alertifyJs.success('User Register Successfully');
          this.route.navigate(['home']);
        },
        error => {
          this.alertifyJs.error('Error in user registration');
        }
      );
  }
}
