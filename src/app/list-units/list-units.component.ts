import { Component, OnInit } from '@angular/core';
import { ListUnitService } from '../services/listUnit.service';
import { Unit } from '../domain/unit';
import { first } from 'rxjs/operators';
import { Router } from '@angular/router';
import { AlertService } from '../services/alert.service';

@Component({
  selector: 'list-units',
  templateUrl: './list-units.component.html',
  styleUrls: ['./list-units.component.css']
})
export class ListUnitsComponent implements OnInit {
  units: Unit[] = [];
  user: string;
  page: number = 0;

  constructor(private listUnit: ListUnitService,
    private alertService: AlertService,
    private router: Router) { }

  ngOnInit() {
    this.getUnits();
    this.user = localStorage.getItem("username");
  }
  
  getUnits(){
    this.listUnit.getUnits(this.page)
      .pipe(first())
      .subscribe((data) =>{
        if (data != undefined) {  
          data.forEach(unit => {  
            this.units.push(unit);  
          });  
        }  
      },
      error => {
        this.alertService.error(error);
         this.router.navigate(['']);
    });
  }

  onPosted(posted: boolean) {
    this.getUnits();
  }

  onScroll()  
  {  
    this.page = this.page + 1;  
    this.getUnits();  
  }  
  
}
