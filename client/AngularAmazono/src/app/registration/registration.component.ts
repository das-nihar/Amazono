import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { RestApiService } from 'src/app/rest-api.service';
import { DataService } from './../data.service';

@Component({
  selector: 'app-registration',
  templateUrl: './registration.component.html',
  styleUrls: ['./registration.component.scss']
})
export class RegistrationComponent implements OnInit {

  email = '';
  name = '';
  password = '';
  password1 = '';
  isSeller = false;
  btnDisabled = false;

  constructor(
    private router: Router,
    private data: DataService,
    private rest: RestApiService
  ) { }

  ngOnInit() {
  }
  validate() {
    if (this.name) {
      if (this.email) {
        if (this.password) {
          if (this.password1) {
            if (this.password === this.password1) {
              return true;
            } else {
              this.data.error('Passwords do not match.');
            }

          } else {
            this.data.error('Confirmation password is not entered.');
          }

        } else {
          this.data.error('Password is not Entered.');
        }

      } else {
        this.data.error('Email is not entered.');

      }

    } else {
      this.data.error('Name is not entered.');
    }
  }

  register() {
    console.log('Register clicked');
    this.btnDisabled = true;
      if (this.validate()) {
        this.rest.postData('http://localhost:3030/api/accounts/signUp',
      {
        name: this.name,
        email: this.email,
        password: this.password,
        isSeller: this.isSeller
      }).subscribe (res => {
        if (res['success']) {
          localStorage.setItem('token', res['token']);
          this.data.success('Registration successful.');
        } else {
          this.data.error(res['message']);
        }
        this.btnDisabled = false;
      });
      }
  }
}
