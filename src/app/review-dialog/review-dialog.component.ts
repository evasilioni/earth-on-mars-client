import { Component, OnInit, Input, Output, EventEmitter, Inject} from '@angular/core';
import { ReviewService } from '../services/review.service';
import { first } from 'rxjs/operators';
import { AlertService } from '../services/alert.service';
// import {MAT_DIALOG_DATA, MatDialogRef} from "@angular/material";
import { FormGroup, FormBuilder } from '@angular/forms';

@Component({
  selector: 'review-dialog',
  templateUrl: './review-dialog.component.html',
  styleUrls: ['./review-dialog.component.css']
})
export class ReviewDialogComponent implements OnInit {
  form: FormGroup;
  title:string;
  selectedValue: any;

  @Input() unitId:number;

  public stars = [];

  @Output() posted = new EventEmitter<boolean>();

  constructor(private reviewService: ReviewService,
    private alertService: AlertService,
    private fb: FormBuilder) { }

  ngOnInit() {
    this.form = this.fb.group({
      selectedValue: ['', []],
      comment: ['', []]
    });
    
    this.stars = [
      {id: 1, name: "1"},
      {id: 2, name: "2"},
      {id: 3, name: "3"},
      {id: 4, name: "4"},
      {id: 5, name: "5"}
    ];
   this.selectedValue = null;
  }

  get f() { return this.form.controls; }

  cancel() {
    this.posted.emit(true);
  }

  save(){
    if(this.f.selectedValue.value != null && this.f.selectedValue.value != ''){     
      console.log(this.unitId);
      this.reviewService.apply(this.unitId, this.f.selectedValue.value.id, this.f.comment.value)
      .pipe(first())
      .subscribe(data => {
        this.posted.emit(true);
        this.alertService
        .success(data.review.numberOfStar + " stars for " + data.unit.title +"-"+ data.unit.region + " completed. Commented that, " + data.review.comment)
      },
      error => {
         this.alertService.error(error);
    });
   }
  }
     
}
