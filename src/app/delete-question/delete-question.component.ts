import { Component } from '@angular/core';
import { SharedService } from '../shared.service';

@Component({
    selector: 'delete-question',
    templateUrl: './delete-question.component.html',
    styleUrls: ['./delete-question.component.scss']
})

export class DeleteQuestionComponent {
    constructor(
      private sharedService: SharedService
    ) { }

    public doDelete() {
        this.sharedService.deleteQuestion();
        this.sharedService.setDeleteQuestionPopup(false);
    }

    public hideDelete() {
        this.sharedService.setDeleteQuestionPopup(false);
    }
}