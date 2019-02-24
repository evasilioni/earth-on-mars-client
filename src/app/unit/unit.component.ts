import { Component, OnInit, Input  } from '@angular/core';
import { Unit } from '../domain/unit';
import {MatDialog, MatDialogConfig} from "@angular/material";
import { ReviewComponent } from '../review/review.component';

@Component({
  selector: 'unit',
  templateUrl: './unit.component.html',
  styleUrls: ['./unit.component.css']
})
export class UnitComponent implements OnInit {

  @Input() unit: Unit[];
  @Input() rating: number;

  public ratingRange = [];
  public unratingRange = [];

  constructor(private dialog: MatDialog) { }

  ngOnInit() {
    

    for(let i=0; i<this.rating; i++){
      this.ratingRange.push(i);
    }

    for(let i=0; i< (5-this.rating); i++){
      this.unratingRange.push(i);
    }
  }

  openDialog(unit) {
    const dialogConfig = new MatDialogConfig();
    dialogConfig.position = {
      'top': '0',
      left: '0'
    };
  
    dialogConfig.data = {
      id: unit.id,
      title: unit.title
    };

    dialogConfig.disableClose = true;
    dialogConfig.autoFocus = true;

    this.dialog.open(ReviewComponent, dialogConfig);
  }

}
