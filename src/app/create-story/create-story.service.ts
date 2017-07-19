import { Injectable } from '@angular/core';
import { Http, RequestOptions } from '@angular/http';
import { Observable } from 'rxjs/Observable';

@Injectable()
export class CreateStoryService {
  private apiURL = 'http://localhost:3000/api/stories';
  constructor(private http: Http) {
  }

  createStory(data: any, token: string): Observable<any> {
    const headers: any = {'MS-AUTH-TOKEN': token };
    const options = new RequestOptions({headers: headers});
    return this.http.post(this.apiURL, data, options);
  }
}
