import { Injectable } from '@angular/core';
import { HttpClient, HttpParams  } from '@angular/common/http';
import { Unit } from '../domain/unit';
import { map } from 'rxjs/operators';

@Injectable({
    providedIn:'root'
  })
export class ListUnitService {
    private units: Unit[];
    
  constructor(private http: HttpClient) {
    }

getUnits(page: number = 1) {
  let params = new HttpParams();

  params = params.append('page', page.toString());
  return this.http.get('/api/units?', {params: params})
      .pipe(map((res: any) => {
        this.units = res;
        return res;
      }));  
  }
}  