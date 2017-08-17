import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { IStory } from '../shared/story.model';
import { StoryResolverService } from '../shared/story-resolver.service';
import { VoteService } from './vote.service';
import * as $ from 'jquery';
import { IMG_URL } from '../../app.routes';
import { TranslateService } from 'ng2-translate';
import { MdDialog } from '@angular/material';
import { EditStoryComponent } from "./edit/edit.component";

@Component({
  templateUrl: './story-details.component.html',
  styleUrls: ['./story-details.component.scss'],
  providers: [StoryResolverService, VoteService]
})

export class StoryDetailsComponent implements OnInit {
  story: IStory;
  image_url = IMG_URL;
  current_user: any;
  commentMapping:
    {[k: string]: string} = {'=1': '# ' + this.translate.instant('single_story.comment'),
    'other': '# ' + this.translate.instant('single_story.comments')};
  voteMapping:
    {[k: string]: string} = {'=1': '# ' + this.translate.instant('single_story.vote'),
    'other': '# ' + this.translate.instant('single_story.votes')};

  constructor(private route: ActivatedRoute, private voteService: VoteService,
    private translate: TranslateService, private dialog: MdDialog) {
  }

  ngOnInit() {
    this.story = this.route.snapshot.data['story'];
    this.current_user = JSON.parse(localStorage.getItem('currentUser'));
    this.checkVoted();
  }

  checkImageExist() {
    return !!this.story.picture;
  }

  onComment() {
    window.scroll(0, window.innerHeight);
    $('#cmt_target').focus();
  }

  onVote() {
    this.voteService.voteStory(this.story.id, this.current_user.token).subscribe(
      response => this.onVoteSuccess(response),
      response => this.onVoteError(response));
  }

  onVoteSuccess(response) {
    if (response) {
      const total_vote = JSON.parse(response._body).data.total_vote;
      this.story.total_vote = total_vote.total_vote;
      if ($('#heart').hasClass('voted')) {
        $('#heart').removeClass('voted');
      } else {
        $('#heart').addClass('voted');
      }
    }
  }

  onVoteError(response) {
    console.log(response);
  }

  checkVoted() {
    if (this.story.users_voted === null) {
      this.story.users_voted = [];
    };
    const user_voted = this.story.users_voted;

    if (user_voted === null) {
      return;
    };

    if (user_voted.find(user => user.id === this.current_user.id)) {
      $('#heart').addClass('voted');
    } else {
      $('#heart').removeClass('voted');
    }
  }

  edit() {
    const height = window.innerHeight * 0.9;
    const width = window.innerWidth * 0.5;
    const dialogRef = this.dialog.open(EditStoryComponent, {
      height: height + 'px',
      width: width + 'px',
    });
    dialogRef.updatePosition({
      top: '5%'
    });
    dialogRef.componentInstance.story = this.story;
  }
}
