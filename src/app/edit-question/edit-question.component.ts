import { Component } from '@angular/core';
import { SharedService } from '../shared.service';

@Component({
    selector: 'edit-question',
    templateUrl: './edit-question.component.html',
    styleUrls: ['./edit-question.component.scss']
})

export class EditQuestionComponent {
    constructor(
        public sharedService: SharedService
    ) { }


    ngOnInit() {
        
    }

    public doEdit() {
        this.sharedService.editQuestion(this.sharedService.question_id, this.sharedService.question_data, this.sharedService.answer_data);
        this.sharedService.setEditQuestionPopup(false);
    }

    public hideEditQuestion() {
        this.sharedService.setEditQuestionPopup(false);
    }
}