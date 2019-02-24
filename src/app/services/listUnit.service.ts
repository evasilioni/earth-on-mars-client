import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Unit } from '../domain/unit';
import { map } from 'rxjs/operators';
import { Observable } from 'rxjs';

@Injectable({
    providedIn:'root'
  })
export class ListUnitService {
    private units: Unit[];
    
  constructor(private http: HttpClient) {
    }

getUnits() {
  return this.http.get('http://localhost:8085/units')
      .pipe(map((res: any) => {
        this.units = res;
        return res;
      }));  
}
    // getUnits() : Observable<Unit[]>{
    //     return this.http.get<Unit[]>('./assets/testUnitData.json'); 
    // }


}  