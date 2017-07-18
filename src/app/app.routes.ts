import { Routes, RouterModule } from '@angular/router';
import { LoginComponent } from './login/login.component';
import { SignupComponent } from './signup/signup.component';
import { CreateStoryComponent } from './create-story/create-story.component';

export const routing: Routes = [
  {
    path: 'login',
    component: LoginComponent
  },
  {
    path: 'signup',
    component: SignupComponent
  },
  {
    path: 'newstory',
    component: CreateStoryComponent
  }
];
export const AppRoutes  = RouterModule.forRoot(routing);
