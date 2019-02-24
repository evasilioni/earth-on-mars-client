import { Component, OnInit, Input  } from '@angular/core';
import { Unit } from '../domain/unit';

@Component({
  selector: 'unit',
  templateUrl: './unit.component.html',
  styleUrls: ['./unit.component.css']
})
export class UnitComponent implements OnInit {

  @Input() unit: Unit[];
  @Input() rating: number;
  public isUpdated: boolean = false;

  public ratingRange = [];
  public unratingRange = [];
  public isOpened: boolean = false;

  constructor() { }

  ngOnInit() {
    

    for(let i=0; i<this.rating; i++){
      this.ratingRange.push(i);
    }

    for(let i=0; i< (5-this.rating); i++){
      this.unratingRange.push(i);
    }
  }

  openPostReview(){
    if(this.isOpened == false){
      this.isOpened = true;
    } else {
      this.isOpened = false;
    }
  }


}
