import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { map } from 'rxjs/operators';

@Injectable({
  providedIn:'root'
})
export class ReviewService {
  constructor(private http: HttpClient) {
  }

  apply(unitId: number, numberOfStar: number, comment: string) {
    return this.http.post('http://localhost:8085/reviews', { unitId: unitId, numberOfStar: numberOfStar,
                                comment: comment})
        .pipe(map((res: any) => {
          return res;
        }));
  }

}