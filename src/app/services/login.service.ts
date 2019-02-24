import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { map } from 'rxjs/operators';

@Injectable({
  providedIn:'root'
})
export class LoginService {
  private authToken : string;
  private name : string;

  constructor(private http: HttpClient) {
  }

  login(username: string, password: string) {
    return this.http.post('http://localhost:8085/signin', { username: username, password: password})
        .pipe(map((res: any) => {
          this.authToken = res.token;
          this.name = res.firstname + ' ' + res.lastname;
          return res;
        }));
  }
  
  public getToken(): string {
    return this.authToken;
  }

  public getUserDetails(): string {
    return this.name;
  }
}