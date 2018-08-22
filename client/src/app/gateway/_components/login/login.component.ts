import { Component, OnInit } from '@angular/core';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  loginForm: FormGroup;

  constructor(
    private _FormBuilder: FormBuilder
  ) { }

  ngOnInit() {
    // Initialize the Login Form
    this.initLoginForm();
  }

  /**
   * Initialize the Login Form Group
   */
  initLoginForm() {
    this.loginForm = this._FormBuilder.group({
      username: ['', Validators.required],
      password: ['', Validators.required]
    });
  }
}
