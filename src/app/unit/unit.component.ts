import { Component, OnInit, Input, Output, EventEmitter  } from '@angular/core';
import { Unit } from '../domain/unit';


@Component({
  selector: 'unit',
  templateUrl: './unit.component.html',
  styleUrls: ['./unit.component.css']
})
export class UnitComponent implements OnInit {
  isPostReviewDialogOpen: boolean = false;

  @Input() unit: Unit;
  @Output() reviewForUnitPosted = new EventEmitter<boolean>();

  public ratingRange = [];
  public unratingRange = [];

  constructor() { }

  ngOnInit() {
    for(let i=0; i<this.unit.score; i++){
      this.ratingRange.push(i);
    }

    for(let i=0; i< (5-this.unit.score); i++){
      this.unratingRange.push(i);
    }
  }

  onPosted(posted: boolean) {
    this.isPostReviewDialogOpen = !posted;
    this.reviewForUnitPosted.emit(posted);
  }

  openDialog() {
    this.isPostReviewDialogOpen = !this.isPostReviewDialogOpen;
  }
}
