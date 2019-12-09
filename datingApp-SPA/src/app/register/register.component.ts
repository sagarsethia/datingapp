import { Component, OnInit } from '@angular/core';
import { AuthService } from 'src/service/auth.service';
import { FormGroup, FormControl, Validators, ValidatorFn } from '@angular/forms';
import { DataService } from 'src/service/data.service';
import {DateformaterPipe} from 'src/service/dateformater.pipe';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit {
  registerForm: FormGroup;
  city = [];
  country = [];

  constructor(
    private authService: AuthService,
    private dataService: DataService,
  ) {
  }

  ngOnInit() {
    this.registerForm = new FormGroup(
      {
        Username: new FormControl(null, [Validators.required]),
        Password: new FormControl('', [Validators.required, Validators.min(5)]),
        name: new FormControl('', [Validators.required]),
        DateOfBirth: new FormControl(null, [Validators.required]),
        City: new FormControl('', [Validators.required]),
        confirmPassword: new FormControl('', [Validators.required]),
        Country: new FormControl(0, [Validators.required]),
        Sex: new FormControl('male', [Validators.required])
      },
      this.comparePassword
    );
    this.city = this.getCities();
    this.getCountries();
  }

  Clear() {
    this.registerForm.reset();
  }

  comparePassword(registerForm: FormGroup): { matchPassword: boolean } {
    return registerForm.get('Password').value ===
      registerForm.get('confirmPassword').value
      ? null
      : { matchPassword: true };
  }

  getCountries() {
    this.dataService.getCountryList().subscribe(res => {
      if (res != null) {
        this.country = res;
      }
    });
  }
  getCities() {
    return [
      { name: 'Parasia', value: 'Parasia' },
      { name: 'Pune', value: 'Pune' },
      { name: 'London', value: 'London' },
      { name: 'Bangalore', value: 'Bangalore' },
      { name: 'Chhindwara', value: 'Chhindwara' }
    ];
  }

  setCountry(event){
     this.registerForm.get('Country').setValue(event.target.value);
  }
  setCity(event){
    this.registerForm.get('City').setValue(event.target.value);
  }

  registerUser() {
     if (this.registerForm.valid) {
      const ngbDate = this.registerForm.value.DateOfBirth;
      const formatedDate =
        ngbDate.year + '/' + ngbDate.month + '/' + ngbDate.day;
      this.registerForm.value.DateOfBirth = new Date(formatedDate);
      this.authService.register(this.registerForm.value);
     }
  }
}
