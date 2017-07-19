import { Injectable } from '@angular/core';
import { Http, RequestOptions } from '@angular/http';
import { Observable } from 'rxjs/Observable';
import { URL } from "../app.routes";

@Injectable()
export class LogoutService {
  private apiURL;
  constructor(private http: Http) {
    this.apiURL = URL + 'api/sign_out';
  }

  logout(token: string): Observable<any> {
    const headers: any = {'MS-AUTH-TOKEN': token};
    const options = new RequestOptions({headers: headers});
    return this.http.delete(this.apiURL, options);
  }
}
