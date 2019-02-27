import { Component, OnInit, OnDestroy } from '@angular/core';
import { Subscription } from 'rxjs';
import { AlertService } from '../services/alert.service';

@Component({
  selector: 'alert',
  templateUrl: './alert.component.html',
  styleUrls: ['./alert.component.css']
})
export class AlertComponent implements OnInit {
  message: any;
  subscription: Subscription

  constructor(private alertService: AlertService) { }

  ngOnInit() {
    this.subscription = 
      this.alertService.getMessage().subscribe(message => { 
          this.message = message; 
      });
  }

  ngOnDestroy() {

    if(this.subscription) {

        this.subscription.unsubscribe();

    }

}
  removeAlert() {
    this.alertService.clear();
  }

}
