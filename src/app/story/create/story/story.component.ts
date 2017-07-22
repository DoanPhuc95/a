import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from "@angular/router";
import { CreateStoryService } from './create_story.service';

@Component({
  selector: 'app-create-story',
  templateUrl: './story.component.html',
  styleUrls: ['./story.component.scss'],
  providers: [CreateStoryService]
})
export class StoryFormComponent implements OnInit {
  private current_user: any;

  constructor(private createStoryService: CreateStoryService,
    private router: Router, private route: ActivatedRoute) { }

  ngOnInit() {
    if (localStorage.getItem('currentUser')) {
      this.current_user = JSON.parse(localStorage.getItem('currentUser'));
    } else location.href = '';
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
      this.router.navigate(['./step'],{ relativeTo: this.route });
    }
  }

  onError(response) {
    if (response.status === 401) {
      if(localStorage.getItem('currentUser')) {
        localStorage.removeItem('currentUser');
      }
      this.current_user = {};
      sessionStorage.clear();
      this.router.navigate(['login']);
    }
  }

  onSubmit(value: any)
  {
    // console.log(value);
    this.createStoryService.createStory(value, this.current_user.token).
      subscribe(response => this.onNext(response),
      response => this.onError(response));
  };

}
