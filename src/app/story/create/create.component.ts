import { Component, OnInit } from '@angular/core';
import {FormArray, FormBuilder, FormGroup, FormControl} from '@angular/forms';
import { CreateStoryService } from './create_story.service';
import { Router } from '@angular/router';
import * as $ from 'jquery';

@Component({
  selector: 'app-create',
  templateUrl: './create.component.html',
  styleUrls: ['./create.component.scss'],
  providers: [ FormBuilder, CreateStoryService ]
})
export class CreateComponent implements OnInit {
  public url_image_story = 'http://saveabandonedbabies.org/wp-content/uploads/2015/08/default.png';
  private current_user: any;
  StoryForm: FormGroup;
  StepForm: FormArray;
  hidden = true;
  private presentStep = -1;
  constructor(private formbuilder: FormBuilder, private router: Router,
    private createService: CreateStoryService) {
  }

  ngOnInit() {
    this.current_user = JSON.parse(localStorage.getItem('currentUser'));
    this.createForm();
    $('#story').addClass('animated fadeInLeft');
    setInterval(function() {
      $('#story').removeClass('animated fadeInLeft');
    }, 1000);
  }

  getStepForm(i: number): FormArray {
    const step = <FormGroup> this.StepForm.controls[i];
    return <FormArray>step.controls['sub_steps_attributes'];
  }

  createForm() {
    this.StoryForm = this.formbuilder.group({
      name: '',
      due_date: '',
      is_public: 'true',
      description: '',
      image: '',
      step: this.formbuilder.array([
        this.initStepForms()
      ])
    });
    this.StepForm = <FormArray>this.StoryForm.controls['step'];
  }

  initStepForms() {
    return this.formbuilder.group({
      name: '',
      content: '',
      sub_steps_attributes: this.formbuilder.array([
        this.initSubStepForm()
      ])
    });
  }

  initSubStepForm() {
    return this.formbuilder.group({
      name: '',
      content: ''
    })
  }

  createStep() {
    $('#story').slideUp('slow', function() {
      $('#step').fadeIn('slow');
    });
    this.presentStep += 1;
    this.hidden = false;
  }

  newSubStep() {
    const sub = "#substep" + this.presentStep;
    if ($(sub).is(':hidden')) {
      $(sub).fadeIn();
      return;
    }
    const control = <FormArray> this.getStepForm(this.presentStep);
    control.push(this.initSubStepForm());
  }

  newStep() {
    window.scroll(0,0);
    const step = '#step' + this.presentStep;
    $(step).addClass('animated fadeOutLeft');
    $(step).slideUp('slow');
    this.StepForm.push(this.initStepForms());
    this.presentStep = this.StepForm.length -1;
    setInterval(function() {
      $(step).removeClass('animated fadeOutLeft');
    }, 1000);
  }

  next() {
    if (this.presentStep === -1) {
      this.createStep();
      return ;
    }
    const step = '#step' + this.presentStep;
    this.presentStep += 1;
    const step_next = '#step' + this.presentStep;
    $(step_next).fadeIn();
    $(step).addClass('animated fadeOutLeft');
    $(step).slideUp('slow');
    setInterval(function() {
      $(step).removeClass('animated fadeOutLeft');
    }, 1000);
  }

  back() {
    if (this.presentStep > 0) {
      const step = '#step' + this.presentStep;
      $(step).addClass('animated fadeOutDown');
      $(step).fadeOut();
      $(step).removeClass('animated fadeOutDown');
      setInterval(function() {
        $(step).removeClass('animated fadeOutDown');
      }, 1000);
      this.presentStep -= 1;
      const step_back = '#step' + this.presentStep;
      $(step_back).fadeIn();
      $(step_back).addClass('animated fadeInLeft');
      setInterval(function() {
        $(step_back).removeClass('animated fadeInRight');
      }, 1000);
      return;
    }
    $('#story').slideDown('slow', function() {
      $('#step').fadeOut();
    });
    this.presentStep -= 1;
  }

  autoExpand(id: string) {
    const textarea = document.getElementById(id);
    textarea.style.height = '72px';
    const contentHeight = document.getElementById(id).scrollHeight;
    textarea.style.height = contentHeight + 'px';
  }

  submit() {
    this.createService.createStory(this.StoryForm.value,
      this.current_user.token).subscribe(response => this.onSuccess(response),
      response => this.onError(response));
  }

  onSuccess(response) {
    console.log(response);
  }

  onError(response) {
    if (response.status === 401) {
      if (localStorage.getItem('currentUser')) {
        localStorage.removeItem('currentUser');
      }
      this.current_user = {};
      sessionStorage.clear();
      this.router.navigate(['login']);
    }
  }

  chooseImage(id: string) {
    $(id).trigger('click');
  }

  changeImage(e) {
    if (e.target.files && e.target.files[0]) {
      const reader = new FileReader();
      reader.onload = this.getImage.bind(this);
      reader.readAsDataURL(e.target.files[0]);
    }
  }

  getImage(e) {
    const image = <FileReader> e.target;
    $("#story_cover").attr("src", image.result);
    this.StoryForm.value.image = image.result;
  }
}
