import { Component, OnInit } from '@angular/core';
import { Router } from "@angular/router";
import { CreateStoryService } from './create.service';
import * as $ from 'jquery';

@Component({
  selector: 'app-create',
  templateUrl: './create.component.html',
  styleUrls: ['./create.component.scss'],
  providers: [CreateStoryService],
})
export class CreateComponent implements OnInit {
  private current_user: any;
  private newstory: any;
  private rows: number = 3 ;
  constructor(private createStoryService: CreateStoryService, private router: Router) {
  }

  ngOnInit() {
    this.rows = 3;
    if (localStorage.getItem('currentUser')) {
      this.current_user = JSON.parse(localStorage.getItem('currentUser'));
    } else this.router.navigate(['/login']);
    if (sessionStorage.getItem('currentNewStory')) {
      this.newstory = JSON.parse(sessionStorage.getItem('currentNewStory'));
    }
  }

  autoExpand() {
    var textarea = document.getElementById('description');
    textarea.style.height = "72px";
    var contentHeight = document.getElementById('description').scrollHeight;
    textarea.style.height = contentHeight + "px";
    window.scroll(0, contentHeight);
  }

  onNext(response) {
    if (response) {
      console.log(response._body);
      // const Story_temp = JSON.parse(response._body);
      // sessionStorage.setItem('currentNewStory',
      //   JSON.stringify(Story_temp.data.story));
    }
  }

  onError(response) {
    if (response) {
      console.log(response._body);
    }
  }

  onCompleted() {

  }

  onSubmit(value: any)
  {
    console.log(value);
    // this.createStoryService.createStory(value, this.current_user.token).
    // subscribe(this.onNext, this.onError, this.onCompleted);
  };
}

// onNext(response) {
//   if (response) {
//     const Story_temp = JSON.parse(response._body);
//     sessionStorage.setItem('currentNewStory',
//       JSON.stringify(Story_temp.data.story));
//   }
// };
//
// onError(response) {
//   if (response.status === 401) {
//     if (localStorage.getItem('currentUser')) {
//       localStorage.removeItem('currentUser');
//       this.current_user = {};
//       sessionStorage.clear();
//       location.reload();
//     }
//   }
// };
//
// onCompleted() {
//   location.href = 'newstory/newstep';
// }
