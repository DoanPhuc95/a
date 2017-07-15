import { Injectable } from '@angular/core';
import { Http, Response } from '@angular/http';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/map';

@Injectable()
export class SignupService {
  private apiURL = 'http://localhost:3000/api/sign_up';
  constructor( private http: Http ) {
  }

  signup(data: any): Observable<any> {
    return this.http.post(this.apiURL, data).map((response: Response) => response.json());
  }
}
