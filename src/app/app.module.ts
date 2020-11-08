import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { HttpClientModule } from '@angular/common/http';
import { CommonModule } from "@angular/common";
import { FormsModule } from '@angular/forms';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';

import { DeleteSubjectComponent } from './delete-subject/delete-subject.component';
import { EditSubjectComponent } from './edit-subject/edit-subject.component';
import { AddSubjectComponent } from './add-subject/add-subject.component';
import { AddQuestionComponent } from './add-question/add-question.component';
import { EditQuestionComponent } from './edit-question/edit-question.component';
import { DeleteQuestionComponent } from './delete-question/delete-question.component';
import { RunQuestionsComponent } from './run-questions/run-questions.component';

const APP_COMPONENTS: any[] = [
  AppComponent,
  DeleteSubjectComponent,
  EditSubjectComponent,
  AddSubjectComponent,
  AddQuestionComponent,
  EditQuestionComponent,
  DeleteQuestionComponent,
  RunQuestionsComponent
];

@NgModule({
  declarations: [
    APP_COMPONENTS
  ],
  imports: [
    BrowserModule,
    CommonModule,
    AppRoutingModule,
    HttpClientModule,
    FormsModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
