import { Component, OnInit, Input, Output, EventEmitter} from '@angular/core';
import { ReviewService } from '../services/review.service';
import { first } from 'rxjs/operators';
import { AlertService } from '../services/alert.service';

@Component({
  selector: 'review',
  templateUrl: './review.component.html',
  styleUrls: ['./review.component.css']
})
export class ReviewComponent implements OnInit {

  public selectedValue;
  public comment;
  @Input() unitId: number;
  @Input() unitTitle: string;
  public stars = [];
  @Input() public isOpened: boolean;

  @Input()  public isUpdated: boolean;
  @Output() isUpdatedChanged = new EventEmitter();

  constructor(private reviewService: ReviewService,
    private alertService: AlertService) { }

  ngOnInit() {
    this.stars = [
      {id: 1, name: "1"},
      {id: 2, name: "2"},
      {id: 3, name: "3"},
      {id: 4, name: "4"},
      {id: 5, name: "5"}
    ];
   this.selectedValue = null;
  }

  close(){
    if(this.isOpened == true){
      this.isOpened = false;
    }
  }

  saveReview(){
    if(this.selectedValue != null){
      this.reviewService.apply(this.unitId, this.selectedValue.id, this.comment)
      .pipe(first())
      .subscribe(data => {
        data;
        this.isOpened = false;
        this.isUpdated = true;
        this.isUpdatedChanged.emit(this.isUpdated);
      },
      error => {
         this.alertService.error(error);
    });
  }
  }
     
}
