import { Component, OnInit } from '@angular/core';
import { ListUnitService } from '../services/listUnit.service';
import { Unit } from '../domain/unit';
import { first } from 'rxjs/operators';
import { Router } from '@angular/router';
import { User } from '../domain/user';
import { AlertService } from '../services/alert.service';
import { LoginService } from '../services/login.service';

@Component({
  selector: 'list-units',
  templateUrl: './list-units.component.html',
  styleUrls: ['./list-units.component.css']
})
export class ListUnitsComponent implements OnInit {
  units: Unit[];
  user: string;

  constructor(private listUnit: ListUnitService,
    private alertService: AlertService,
    private router: Router) { }

  ngOnInit() {
    this.getUnits();
    this.user = localStorage.getItem("username");
  }
  
  getUnits(){
    this.listUnit.getUnits()
      .pipe(first())
      .subscribe(data => {
        this.units = data;
      },
      error => {
        this.alertService.error(error);
         this.router.navigate(['']);
    });
  }

  onPosted(posted: boolean) {
    this.getUnits();
  }

}
