import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { first } from 'rxjs/operators';
import { LoginService } from '../services/login.service';
import { AlertService } from '../services/alert.service';

@Component({
  selector: 'login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit{
  loginForm: FormGroup;

  constructor(private formBuilder: FormBuilder,
    private router: Router,
    private loginService: LoginService, 
    private alertService: AlertService) { }

  ngOnInit() {
    this.loginForm = this.formBuilder.group({
      username: ['', Validators.required],
      password: ['', Validators.required]
    });
  }

  get f() { return this.loginForm.controls; }

  onSubmit() {
    console.log(this.f.username.value, this.f.password.value);

     // stop here if form is invalid
     if (this.loginForm.invalid) {
      return;
      }
        this.loginService.login(this.f.username.value, this.f.password.value)
           .pipe(first())
           .subscribe(
               data => {           
                 if( data.token != '' && data.token != undefined){
                   this.router.navigate(['listUnits']);
                 }    
               },
               error => {
                  this.alertService.error(error);
                  this.router.navigate(['']);
                  this.loginForm.controls.username.setValue("");
                  this.loginForm.controls.password.setValue("");
           });
    }

  }