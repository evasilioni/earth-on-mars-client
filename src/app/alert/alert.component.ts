import { Component, OnInit } from '@angular/core';
import { Subscription } from 'rxjs';
import { AlertService } from '../services/alert.service';

@Component({
  selector: 'alert',
  templateUrl: './alert.component.html',
  styleUrls: ['./alert.component.css']
})
export class AlertComponent implements OnInit {
  message: any;

  constructor(private alertService: AlertService) { }

  ngOnInit() {
      this.alertService.getMessage().subscribe(message => { 
          this.message = message; 
      });
  }

  removeAlert() {
    this.alertService.clear();
  }

}
