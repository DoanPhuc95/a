import {Component, Input} from '@angular/core';

@Component({
  templateUrl: './sub-step.component.html',
  styleUrls: ['./sub-step.component.scss']
})

export class SubStepComponent {
  public name: string;
  public sub_steps: any[];
}
