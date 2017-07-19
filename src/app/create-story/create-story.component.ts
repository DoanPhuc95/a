import { Component, OnInit } from '@angular/core';
import { CreateStoryService } from './create-story.service';

@Component({
  selector: 'app-create-story',
  templateUrl: './create-story.component.html',
  styleUrls: ['./create-story.component.scss'],
  providers: [ CreateStoryService ]
})
export class CreateStoryComponent implements OnInit {
  private current_user: any;
  constructor(private createStory: CreateStoryService ) {}

  ngOnInit() {
    if (localStorage.getItem('currentUser')) {
      this.current_user = JSON.parse(localStorage.getItem('currentUser'));
    }

  }

  onCompleted() {
    console.log('create success!');
  };

  onSubmit(value: any) {
    this.createStory.createStory(value, this.current_user.token).subscribe(this.onCompleted);
  };
}
