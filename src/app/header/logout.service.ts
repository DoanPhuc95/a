import { Injectable } from '@angular/core';
import { Http, RequestOptions } from '@angular/http';
import { Observable } from 'rxjs/Observable';

@Injectable()
export class LogoutService {
  private apiURL = 'http://localhost:3000/api/sign_out';
  constructor(private http: Http) {
  }

  logout(token: string): Observable<any> {
    const headers: any = {'MS-AUTH-TOKEN': token};
    const options = new RequestOptions({headers: headers});
    return this.http.delete(this.apiURL, options);
  }
}
