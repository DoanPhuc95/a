import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-story',
  templateUrl: './story.component.html',
  styleUrls: ['./story.component.scss']
})
export class StoryComponent implements OnInit {
  private current_user: any;
  constructor(private router: Router, private route: ActivatedRoute) {}

  ngOnInit() {
    if (localStorage.getItem('currentUser')) {
      this.current_user = JSON.parse(localStorage.getItem('currentUser'));
    } else this.router.navigate(['/login']);
    if (!sessionStorage.getItem('currentNewStory')) {
      this.router.navigate(['./create'], { relativeTo: this.route });
    }
  }
}
