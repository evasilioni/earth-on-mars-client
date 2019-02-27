import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { map } from 'rxjs/operators';

@Injectable({
  providedIn:'root'
})
export class LoginService {

  constructor(private http: HttpClient) {
  }

  login(username: string, password: string) {
    return this.http.post('api/signin', { username: username, password: password})
        .pipe(map((res: any) => {
          localStorage.setItem("token",res.token);
          localStorage.setItem("username",res.firstname + ' ' + res.lastname)
          return res;
        }));
  }

}