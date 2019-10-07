import { Component, OnInit } from '@angular/core';
import { AuthService } from 'src/service/auth.service';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css']
})
export class NavbarComponent implements OnInit {
  model: any = {};
  isUserLoggedIn: boolean;
  constructor(private _authService: AuthService) {
  }

  ngOnInit() {
    this.userLoggedInUser();
  }

  login() {
    this._authService.login(this.model).subscribe(res => {
      console.log('Successfully Logged In');
      this.isUserLoggedIn = true;
    }, error => { console.log(error); });
  }

  userLoggedInUser() {
    this.isUserLoggedIn = localStorage.getItem('tokenString') ? true : false;
  }

  logOut() {
    localStorage.removeItem('tokenString');
    this.isUserLoggedIn = false;
  }

}
