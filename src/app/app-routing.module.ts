import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { CommonModule } from "@angular/common";

import { HomeComponent } from './home/home.component';
import { SubjectListComponent } from './subject-list/subject-list.component';
import { QuestionListComponent } from './question-list/question-list.component';

const APP_COMPONENTS: any[] = [
  HomeComponent,
  SubjectListComponent,
  QuestionListComponent
];

const routes: Routes = [
  { path: '', component: HomeComponent },
  { path: 'subjects', component: SubjectListComponent },
  { path: 'questions/:id', component: QuestionListComponent },
];

@NgModule({
  declarations: [APP_COMPONENTS],
  imports: [CommonModule, RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
