import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { DataService } from './../data.service';
import { RestApiService } from '../rest-api.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {

  email = '';
  password = '';

  btnDisabled = false;

  constructor (
  private router: Router,
  private data: DataService,
  private rest: RestApiService) { }

  ngOnInit() {
  }
  
  validate() {
    if (this.email) {
       if (this.password) {
         return true;
       } else {
         this.data.error('Password is not entered.');
       }
    } else {
      this.data.error('Email is not entered.');
    }
  }

  login() {
    this.btnDisabled = true;
    if (this.validate()) {
      this.rest.postData('http://localhost:3030/api/accounts/signIn',
      {
        email: this.email,
        password: this.password
      }
    ).subscribe(res => {
       if (res['success']) {
         localStorage.setItem('token', res['token']);
         this.data.success(res['message']);
         this.router.navigate(['/']);
       } else {
         this.data.error(res['message']);
       }
       this.btnDisabled = false;
    });
    }

  }
}
