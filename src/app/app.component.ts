import { Component, Injectable } from '@angular/core';
import { SharedService } from './shared.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
  providers: [SharedService]
})
export class AppComponent {
  constructor(
    private sharedService: SharedService
  ) {
    sharedService.updateView$.subscribe(
      update => {
        if (update == true) {
          this.updateView();
        }
      });
  }

  title = 'studyhelper';

  public subject_id;
  public delete_subject;
  public edit_subject;
  public add_subject;
  
  public question_id;
  public add_question;
  public delete_question;
  public edit_question;

  public ngOnInit() {
    this.subject_id = 0;
    this.question_id = 0;

    this.delete_subject = false;
    this.edit_subject = false;
    this.add_subject = false;
    this.add_question = false;
    this.delete_question = false;
    this.edit_question = false;
  }

  updateView() {
    this.subject_id = this.sharedService.subject_id;
    this.question_id = this.sharedService.subject_id;

    this.delete_subject = this.sharedService.delete_subject;
    this.edit_subject = this.sharedService.edit_subject;
    this.add_subject = this.sharedService.add_subject;
    this.add_question = this.sharedService.add_question;
    this.delete_question = this.sharedService.delete_question;
    this.edit_question = this.sharedService.edit_question;
  }

  doDelete(data) {
    if (data == true) {
      this.sharedService.doUpdateSubjects();
    }
  }

  doEditSubject(data) {
    if (data == true) {
      this.sharedService.doUpdateSubjects();
    }
  }
}