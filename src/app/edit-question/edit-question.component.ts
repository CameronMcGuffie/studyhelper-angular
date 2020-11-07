import { Component, EventEmitter, Output, Input } from '@angular/core';
import { SharedService } from '../shared.service';

@Component({
    selector: 'edit-question',
    templateUrl: './edit-question.component.html',
    styleUrls: ['./edit-question.component.scss']
})

export class EditQuestionComponent {
    constructor(
      private sharedService: SharedService
    ) { }

    question_name: string;

    ngOnInit() {
        // this.sharedService.getSubjectName(this.sharedService.item_id).subscribe(data => {
        //     this.subject_name = data.subject.name;
        // });
    }

    public doEdit() {
        this.sharedService.editQuestion(this.sharedService.item_id, this.question_name);
        this.sharedService.setEditQuestionPopup(false);
    }

    public hideEditQuestion() {
        this.sharedService.setEditQuestionPopup(false);
    }
}