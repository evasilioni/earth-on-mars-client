import { Component, OnInit, Input, Output, EventEmitter, Inject} from '@angular/core';
import { ReviewService } from '../services/review.service';
import { first } from 'rxjs/operators';
import { AlertService } from '../services/alert.service';
import {MAT_DIALOG_DATA, MatDialogRef} from "@angular/material";
import { FormGroup, FormBuilder } from '@angular/forms';

@Component({
  selector: 'review',
  templateUrl: './review.component.html',
  styleUrls: ['./review.component.css']
})
export class ReviewComponent implements OnInit {
  public selectedValue;

  form: FormGroup;
  title:string;
  unitId:number;

  public stars = [];

  @Input()  public isUpdated: boolean;
  @Output() isUpdatedChanged = new EventEmitter();

  constructor(private reviewService: ReviewService,
    private alertService: AlertService,
    private fb: FormBuilder,
    private dialogRef: MatDialogRef<ReviewComponent>,
    @Inject(MAT_DIALOG_DATA) data) { 
      this.title = data.title;
      this.unitId = data.id;
    }

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

  close(){
    this.dialogRef.close();
  }

  save(){
    if(this.f.selectedValue.value != null){
      this.reviewService.apply(this.unitId, this.f.selectedValue.value.id, this.f.comment.value)
      .pipe(first())
      .subscribe(data => {
        data;
        this.isUpdated = true;
        this.isUpdatedChanged.emit(this.isUpdated);
        this.dialogRef.close();
      },
      error => {
         this.alertService.error(error);
    });
  }
  }
     
}
