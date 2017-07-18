import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-create-story',
  templateUrl: './create-story.component.html',
  styleUrls: ['./create-story.component.css']
})
export class CreateStoryComponent implements OnInit {
  public current_user: string = null;
  constructor() { }

  ngOnInit() {
    if(window.localStorage.getItem('currentUser')) {
      this.current_user = window.localStorage.getItem('currentUser');
      console.log(this.current_user);
    }
  }

}
