import { Component, OnInit } from '@angular/core';
import { AuthService } from 'src/service/auth.service';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit {
  registerModel: any = {};
  constructor(private authService: AuthService) { }

  ngOnInit() {
  }
  registerUser() {
    this.authService.register(this.registerModel);
  }

}
