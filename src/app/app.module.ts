import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
<<<<<<< HEAD
import { MdButtonModule } from '@angular/material';
=======
import {MdButtonModule} from '@angular/material';
>>>>>>> 22931c418547c93fdc3eeae8a194bf161b43a438
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpModule } from '@angular/http';
import { AppRoutes } from './app.routes';
import { I18nModule } from './app.i18n';
import { AppComponent } from './app.component';
import { LoginComponent } from './login/login.component';
import { SignupComponent } from './signup/signup.component';
import { HeaderComponent } from './header/header.component';
import { StoryComponent } from './story/story.component';
import { CreateComponent } from './story/create/create.component';
import { StoryindexComponent } from './story/storyindex/storyindex.component';
import { MdDialogModule } from '@angular/material';
import { LoggedInGuard } from './logged-in.guard';
import 'hammerjs';

@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    SignupComponent,
    HeaderComponent,
    StoryComponent,
    CreateComponent,
    StoryindexComponent
  ],
  imports: [
    BrowserModule,
    FormsModule,
    ReactiveFormsModule,
    HttpModule,
    AppRoutes,
    I18nModule,
    BrowserAnimationsModule,
    MdButtonModule,
    MdDialogModule
  ],
  entryComponents: [
    LoginComponent,
    SignupComponent
  ],
  providers: [LoggedInGuard],
  bootstrap: [AppComponent]
})
export class AppModule { }
