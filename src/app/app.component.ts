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

  public item_id;
  public delete_subject;
  public edit_subject;
  public add_subject;

  public ngOnInit() {
    this.item_id = 0;

    this.delete_subject = false;
    this.edit_subject = false;
    this.add_subject = false;
  }

  updateView() {
    this.item_id = this.sharedService.item_id;

    this.delete_subject = this.sharedService.delete_subject;
    this.edit_subject = this.sharedService.edit_subject;
    this.add_subject = this.sharedService.add_subject;
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