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

const APP_COMPONENTS: any[] = [
  AppComponent,
  DeleteSubjectComponent,
  EditSubjectComponent,
  AddSubjectComponent
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
