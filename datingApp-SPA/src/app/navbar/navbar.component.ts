import { Component, OnInit } from '@angular/core';
import { AuthService } from 'src/service/auth.service';
import { AlertifyService } from 'src/service/alertify.service';
import { JwtHelperService } from '@auth0/angular-jwt';
import { Router } from '@angular/router';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css']
})
export class NavbarComponent implements OnInit {
  model: any = {};
  isUserLoggedIn: boolean;
  userName: string;
  userId: string;
  JwtHelperService: JwtHelperService = new JwtHelperService();
  constructor(public authService: AuthService, private alertifyService: AlertifyService,private router: Router) {
  }

  ngOnInit() {
    this.userLoggedInUser();
  }

  login() {
    this.authService.login(this.model).subscribe(res => {
      this.isUserLoggedIn = true;
      const token = localStorage.getItem('token');
      this.userName = this.JwtHelperService.decodeToken(token).unique_name;
      this.userId = this.JwtHelperService.decodeToken(token).nameid;
      this.router.navigate(['home']);
    }, error => { 
      this.alertifyService.error('Error in User Logged In'); 
    });
  }

  userLoggedInUser() {
    this.isUserLoggedIn = this.authService.isUserLoggedIn();
  }

  logOut() {
    localStorage.removeItem('token');
    this.isUserLoggedIn = false;
    this.alertifyService.error('User Logged Out Successfully');
    this.router.navigate(['home']);
  }

}
